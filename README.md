# Booking Calendar App
React based client side of booking calendar app.

## How to run?
```
npm i

// for .NET Framework backend run:
npm start

// for .NET Core backend run:
npm start:netcore
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

### v1.6.3
- Polling of bookings only if window is focused.

### v1.6.2
- Added panoramic view allowing to schematically visualize occupations.
- Fixed remaining app bar scroll state on page change.
- Fixed base64 issues with binary content type responses from AWS.

### v1.6.1
- Pointing to backend API hosted on Amazon.

### v1.6.0
- Migrated API calls to RTK Query.
- Handling authorization to backend.
- Moved settings page from app drawer into a dedicated page with tabs for user and structure data.
- Static italian localization for date formats.

### v1.5.4
- Considering wether deposit is with bank transfer for displaying payment notification.

### v1.5.3
- Added deposit not confirmd sign to tiles.

### v1.5.2
- Animated exit from ISTAT screen on data sent.
- Fixed surface dim not restored when exiting from ISTAT not by navigation back button.

### v1.5.1
- Overhaul of ISTAT export. Data can be edited before exporting.
- Better error handling from backend.
- Added possibility to dim surface.

### v1.5.0
- Introduced selector of columns in table.
- Selecting date in date picker in table moves first column to selected date.

### v1.4.2
- Fixed canadian locale date strings breaking date string formatting.

### v1.4.1
- Added error detailed description in snackbar.

### v1.4.0
- Added circular progress while tiles are still loading.
- Better optimization on tiles dragging.
- Added vertical scrolling in calendar.
- Custom scrollbars.
- Fixed various minor errors.
- Added base board information to tiles.

### v1.3.0
- Fixed bookings page issue on trying to use booking color directly from back end, which might be unsigned.
- Better DnD. Using mouse events instead of HTML5 DnD API. Can drag and scroll.

### v1.2.1
- Prepared configs for production.
- Fixed bug when trying to parse json from POST requests which do not have response body.

### v1.2.0
- Getting along with web service API. Slightly changed endpoints, data structures etc.
- Handling html entities which may occur in fields from back-end response.
- Splitting clients query by periods of time to improve responsiveness of the search.
- Considering police and istat data publications directly to their web services, without downloading intermediate files.
- Download police ricevuta directly from their web service.

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
