require('dotenv').config();

const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , massive = require('massive')
    , app = express()
    , session = require('express-session')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')

app.set('port', process.env.PORT || 3030);
app.use(bodyParser.json());
app.use(cors());

app.use(session({
    resave: process.env.RESAVE,
    saveUninitialized: process.env.SAVEUNINITIALIZED,
    secret: process.env.SESSION_SECRET
}))
    
app.use(passport.initialize());
app.use(passport.session());

massive(process.env.CONNECTION_STRING).then(db => {
    app.set('db', db);
}).catch(err => {
    console.log('DB connect error >> ', err)
})

passport.use(new Auth0Strategy({
    domain: process.env.DOMAIN,
    clientID: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    callbackURL: process.env.CALLBACK,
    scope: 'openid profile'
},
function (accessToken, refreshToken, extraParams, profile, done) {
    console.log(profile);
    let db = app.get('db');
    db.getUserByAuthId([profile.id]).then((response) => {
        user = response[0];
        if (!user) {
            console.log('CREATING USER');
            db.createUserByAuth([profile.id, profile.displayName, 'user', 'Pending']).then((user) => {
                return done(null, user)
            })
        } else {
            console.log('FOUND USER', user);
            return done(null, user)
        }
    }).catch(err => {
        console.log(err)
    });
}
));

passport.serializeUser(function(user, done) {
    console.log('serializing user: ', user)
    done(null, user)
})

passport.deserializeUser(function(user, done) {
    console.log('deserializing user: ', user)
    done(null, user)
})

app.get('/api/login', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/profile/',
    failureRedirect: '/'
}));

app.get('/api/me', (req, res, next) => {
    res.status(200).send(req.user);
})

// app.post('/api/request', (req, res, next) => {
//     console.log(req.body)
// })

app.get('/api/getuserlevels', (req, res, next) => {
    app.get('db').getUserPermissions().then(users => {
        res.status(200).send(users);
    })
})

app.post('/api/approveuser', (req, res, next) => {
    console.log(req.body.userId);
    app.get('db').updatePermission([req.body.userId]).then(response => {
        console.log(`User ${req.body.userId} has been updated`)
        res.status(200).send(`User ${req.body.userId} has been updated`)
    })
})

app.listen(app.get('port'), () => {
    console.log(`Listening on port ${app.get('port')}`)
})