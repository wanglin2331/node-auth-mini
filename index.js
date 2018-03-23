const express = require('express');
const session = require('express-session');
const passport = require('passport');
const strategy = require('./strategy');

const app = express();

app.use(session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(strategy);

passport.serializeUser(function(user,done){
    console.log(2);
    done(null, {
        id: user.id,
        display: user.displayName,
        nickname: user.nickname,
        email: user.emails[0].value
    });
});

passport.deserializeUser(function(obj, done){
    console.log(3);
    done(null, obj);
});

app.get('/login', passport.authenticate('auth0', {
    successRedirect: '/me',
    failureRedirect: '/login',
    failureFlash: true,
    scope: 'profile email'
}));

app.get('/me',(req,res,next)=>{
    console.log(4);
    if(!req.user){
        res.redirect('/login');
    } else {
        res.status(200).send(JSON.stringify(req.user, null, 10));
    }
});


const port = 3000;
app.listen( port, () => { console.log(`Server listening on port ${port}`); 
});