# Plant App
A react native app for android and iOS to browse plants and related products for your garden. Distribution with expo. 
Code originally written by [dribbble2react](https://github.com/react-ui-kit/dribbble2react). This is my implementation of same design.

Original screen designs : [Dribble](https://dribbble.com/shots/4569970-Plant-Freebie-2-Dribbble-Invites)

![](https://github.com/shubhamgupta2901/plant-app-react-native/blob/master/screenshot.png)

### Installation
1. Rename the ```config.sample.js``` file placed in root to ```config.js```
2. Replace ```YOUR-UNSPLASH_APPLICATION_ID``` and ```YOUR-UNSPLASH-SECRET``` below with your unsplash application_id and secret respectively. You can register in unsplash [here](https://unsplash.com/join).

### Planned improvements on original app:
  - [X] All dimensions in React Native are unitless, and represent density-independent pixels. Setting dimensions this way is common for *components that should always render at exactly the same size, regardless of screen dimensions*. Due to this, the application **does not scale well on Tablets and different size devices**. Will be looking to solve that issue.  Will also need to use **dynamic font sizes** (rem?).
  - [X] The implementation is iOS-first and hence there are certain **issues when running the app on android devices** (elevations etc). Need to fix that.
  - [X] Browse Screen uses a very ineffcient way to implement tabs, and only shows list of categories in all three tabs. Would be replacing the tabs with react-native's **tab-view and navigation**. Will be showing **categories, articles and galleries** in the three tabs.
  - [X] Explore Screen's images rendering is hardcoded. Will be replacing with a **Pinterest-like Staggered Gridview** for dynamic image sizes.
  - [ ] Will be working on implementing and **dark mode** of application.
  - [ ] Will allow users to **save/bookmark articles and galleries**.
  - [X] Product Screen's gallery does not have steps. Not very intutive that it represents a list. Will add **step indicators** in the gallery.
