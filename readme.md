# Dejavu.js

This library is funny slide plugin without any framework dependencies.

slide will be changed when you don't look specified slide.

yes. if you see that slide and scroll to other area,
`dejavu.js` will change that slide
and you will suprised when you see that slide again.

isn't funny, huh?

well, I don't care that you think this library is useless.
if you want to make suprise slide to others, just use it.

## Usage

download and add script,

```html
<script src="dejavu.js"></script>
```

and apply to some slide.

```js
window.onload = function(){
    var slide = Dejavu('#slide')[0];
    
    slide.dejavu.on('inside', function(e){
        console.log('you are looking my slide.');
    }).on('outside', function(e){
        console.log('you are not looking my slide. I will change this.');
    });
};
```

## Hand manual

### Options

```js
var options = {//these values are default.
                  enable: true,    // enable dejavu system.
                  random: false,   // slide will select next random slide.
                  shuffle: false,  // shuffle slide items on init.
                  update: false,   // update slide items randomly.
                  oninit: null,    // event function fires when init
                  onoutside: null, // event function fires when scroll outside a target 
                  oninside: null,  // event function fires when viewers can see a target
                  onupdate: null,  // event function fires when update position
                  sort: null,      // custom slide items sort function
                  margin: 10       // a default value that client can view outside margin
              };

var target = Dejavu('css selector or id', options);
```

### Members

all members are can access inside plain `HTMLElement` object when dejavu initialized.
also, all members will return `dejavu` object. (except `target()` and `destroy()`.)

(e.g, `document.querySelector('#dejavu_slide').dejavu`)

- `.dejavu.enable(bool)` enable dejavu. set `true` value will activate it. otherwise will disabled.
- `.dejavu.random()` change slide position randomly and render.
- `.dejavu.next()` change slide position to next slide item and render.
- `.dejavu.prev()` change slide position to previous slide item and render.
- `.dejavu.render(int)` shows current slide position or user specified position.
- `.dejavu.shuffle()` sort slide items randomly. this function will not render.
- `.dejavu.sort(function)` sort slide items with specified sort function. same as `Array.prototype.sort()`.
- `.dejavu.destroy()` destroy dejavu object and back to normal element.
- `.dejavu.update(bool)` update slide position manually. or set a `bool` value for auto update when window resized.
- `.dejavu.on(string, function)` add a event with specified type.
- `.dejavu.off(string, function)` remove a event function with specified type.
- `.dejavu.emit(string)` triggers all event function with specified type.
- `.dejavu.target()` get the element from current `dejavu` object.

## Demo

[Codepen](http://codepen.io/composite/pen/kkaYOq/)

## FAQ

### this library is only slide elements supported?

umm... yes. currently. but you can use widely with fake slide like below:

```html
<ul id="fake"><li></li><li></li></ul>
<span id="text">OH YEAH!</span>

<script>
window.onload = function(){
    var fake = Dejavu('#fake')[0];
    fake.dejavu.on('outside', function(){
        document.querySelector('#text').innerHTML = 'RANDOM STRING: ' + Math.random();
    });
};
</script>
```

## License

MIT. no more words. just use and share and enjoy it.
