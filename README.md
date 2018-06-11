# Sky Bikes

## Demo
A demo is available here https://abenoit.github.io/skybikes/

## Ride the project

```javascript
// Install
npm i

// Run
npm start

// Test
npm test
```

---

## Explainations

This is a prototype for an application to manage bikes rental.

There are 3 stations around town:

- **Mont-Royal** : 8 bikes available, 2 free slots
- **Village** : 6 bikes available, 4 free slots
- **Outremont** : 7 bikes available, 3 free slots

A customer can sign up to become a member and thus to able to access the platform.

The application is already initialized with one member whose email is `amelie.benoit33@gmail.com`

The member tab only requires a registered member's email to login. Once connected, the member can chose where to rent her/his bike.

When the bike is rented, a timer starts. The member can chose where to return the bike among the three previous stations. If the time is up before the member returned the bike, (s)he is banned from the application and can no longer rent a bike. The bike (s)he rented is returned in the first station with an available slot.

The member can login / logout and still recover all his rental information (timer).

The Sys Admin tab contains all the information about the system (stations and members).

---

## Technical choices

### VanillaJS

I did not use any framework in this project, just some libraries to help me with the packaging, development server, templating etc. - see below.

### Webpack

Bundler and development server.

### Babel

In addition of using it to transform some ES6 syntax for old browsers, I needed it to use new syntax such as spread operators in my reducers.

### Redux

I chose to manage the state of the appliation with Redux. A structure of my reducers ById and AllIds was very usefull to manage add and update events such as signup, renting, bannishing, etc.

Also, fetching all the all the data is easy to be displayed in SysAdmin tab for instance.

### SCSS

Structures the stylesheet using nested classes.

### Templating

Useful to pass data from Javascript to the HTML, and structure the HTML.

A main App.mustache is hosting the partials that contains the appropriate screen when naviguating.

### Material UI library

Just for the look & feel :)

---

## Possible improvements

- Use of sanitizers for the signup form
- City workers daily work to clean and set up the bikes
