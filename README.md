# Monitor Bitcoin  

Send a notification to your email when the Bitcoin price fall a given value. 

---

## To use it:  

In a .env file inside the folder set your email direction and password to sent emails, like below:  

```
USER_EMAIL=Your-Email
PASS_EMAIL=Your-Password
```

Now is setting up using gmail, but you can change it in the email.js file. It use nodemailer module.

In config.json you can put your own parameters: 

```javascript
{
    "exchanges": ["bittrex", "poloniex"], // What exchanges to monitor the value - look below
    "interval": 0.5, // Interval to make request in minutes
    "check": 15,  // Time to take another sample if the value do not acommplish the condition in minutes
    "lost": 50, // Lost quantity in dollars to check
    "to": "christiandbf@hotmail.com",  // Where send the email
    "subject": "Monitoreo Bitcoin" // Subject in email
}
```

To define the exchanges see the [ccxt](https://github.com/ccxt/ccxt) module to know the supported exchanges.
