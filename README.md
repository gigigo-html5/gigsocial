# gigsocial
Angular Module for Social Share in Facebook or Twitter


## install

`bower install gigsocial --save`

## example

```js

var app = angular.module('app', ['gig-social'])

.config(function(GigSocialProvider) {
      // initial configuration
      GigSocialProvider.setFacebookID('XXXXXXXXXXXXXXX');
        
})
    
});
```

Use the Social Directive

```html

<gig-social title="Title Example" link="http://www.gigigo.com"></gig-social>
```
