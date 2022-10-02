# Booking Calendar App
React based client side of booking calendar app.

## How to run?
```
npm i
npm start
```

## What is it?
A client side part of a web app for managing hotel bookings by organazing them in a calendar view. Intended for hotel administrators' usage.

## What can it do?
- Display bookings in a calendar.
- DnD for assign a booking to a room, or unassign it.
- Colorize bookings.
- Show warnings whether a booking was assigned to a wrong room.
- Display bookings and guests detailed info.
- Bookings/guests search.
- Statistics gathering (Italy related).

## Dependencies?
- **React**: the base of the app.
- **Redux**: global data managing.
- **Material UI**: styling.
- **React Router**: single page app routing.

## Changes
### v1.1.2
- Allow only booking name in bookings fetch request.
### v1.1.1
- Merged floors and rooms GET API method endpoints.
### v1.1.0
- Added hotel edit page.
- Splitted hotel API endpoint into two: floors and rooms.
- Using material color utilities for colors generation.
- Fixed booking details show alerts when it should not show them.
- Room id is referenced from tile data, instead of just room number.
### v1.0.1
- Better API endpoints.
