/*!
 * dejavu.js v 0.1.0
 * http://github.com/composite/Dejavu.js/
 *
 *
 * Copyright 2016 Ukjin 'Composite' Yang.
 * Released under the MIT license
 * http://github.com/composite/Dejavu.js/license.md
 *
 */
!function(w,d){
    'use strict';
    //global event and type name
    var EVENT_FUNC = 'v' != '\v' ? 'addEventListener' : 'attachEvent', EVENT_ON = 'v' != '\v' ? '' : 'on',
        // is enumerable?
        isc = function(ar){return ar.length === [].slice.call(ar, 0).length;},
        // make element with function
        mkel = function(t, f){var el = d.createElement(t); if(typeof(f) === 'function') f.call(el, t); return el;},
        // dejavu members
        ns   = {ev: 'DEJAVU_SCROLLEV', ch: 'DEJAVU_CHILDREN', op: 'DEJAVU_OPTION', po: 'DEJAVU_POSITION', on: 'DEJAVU_EVENT'}, DEJAVU_AFFECTED = [],
        // array indexof
        inA  = function(a, b, c){for(var i=0,l=a.length; a<l; a++) if(c ? a[i] === b : a[i] == b) return i; return -1;},
        // is string?
        isS  = function(s){return typeof s === 'string' || s instanceof String;},
        // get scroll position
        getS = function(){return {
                x: w.scrollX || w.pageXOffset || d.documentElement.scrollLeft || d.body.scrollLeft,
                y: w.scrollY || w.pageYOffset || d.documentElement.scrollTop || d.body.scrollTop
        };}, trace = function(m){if(w.Dejavu.debug) console.debug(m);},
        screenX = screen.availWidth, screenY = screen.availHeight,
        // dejavu methods
        met  = {
            /**
             * enable or disable dejavu effect.
             * @param  {Boolean} b true if you want enable dejavu effect. false otherwise.
             * @return {Dejavu}    the dejavu object of current element.
             */
            enable: function(b){
                trace(this[ns.po].ENABLE = !!b);
                return this.dejavu;
            },
            /**
             * toggle random effect when argument set, or show random slide immediately.
             * @param  {Boolean} b true or false if you want random slide on or off. move to random slide if not set.
             * @return {Dejavu}    the dejavu object of current element.
             */
            random: function(b){
                if(b !== undefined) trace(this[ns.po].RANDOM = !!b);
                else this.dejavu.render(~~(Math.random() * this[ns.po].LENGTH));
                return this.dejavu;
            },
            /**
             * move to next slide.
             * @return {Dejavu}    the dejavu object of current element.
             */
            next: function(){
                trace(this[ns.po].CURRENT++);
                if(this[ns.po].CURRENT == this[ns.po].LENGTH) this[ns.po].CURRENT = 0;
                return this.dejavu.render();
            },
            /**
             * move to previous slide.
             * @return {Dejavu}    the dejavu object of current element.
             */
            prev: function(){
                trace(this[ns.po].CURRENT--);
                if(this[ns.po].CURRENT < 0) this[ns.po].CURRENT = this[ns.po].LENGTH - 1;
                return this.dejavu.render();
            },
            /**
             * render slide position.
             * @param  {Number} n  the slide position. if not set, current position will be used.
             * @return {Dejavu}    the dejavu object of current element.
             */
            render: function(n){
                n = isNaN(n) ? this[ns.po].CURRENT : ~~n;
                for(var i=0,cs=this[ns.ch],len=cs.length;i<len;i++){
                    // if child node has been removed. update and rerun.
                    if(cs[i].parentNode != this){
                        trace(cs[i]);
                        trace('[DEJAVU] has been removed from parent. updating...');
                        this.dejavu.update();
                        return this.dejavu.prev();
                    }
                    if(i != n) cs[i].setAttribute('hidden', 'hidden');
                    else cs[i].removeAttribute('hidden', 'hidden');
                }
                return this.dejavu;
            },
            /**
             * shuffle slide queue.
             * @return {Dejavu}    the dejavu object of current element.
             */
            shuffle: function(){
                this[ns.ch].sort(function(){return ~~(Math.random() * 3) - 1;});
                return this.dejavu;
            },
            /**
             * sort slide queue if you want.
             * @param  {Function} fn [description]
             * @return {Dejavu}    the dejavu object of current element.
             */
            sort: function(fn){
                this[ns.ch].sort(fn);
                return this.dejavu;
            },
            /**
             * destroy Dejavu object and return to plain object.
             * @return {Element}    the current element.
             */
            destroy: function(){
                return w.Dejavu.destroy(this);
            },
            /**
             * update position for moved element position and children.
             * @param  {Boolean} b true if you want enable auto update when window resized. false to disable. update immediately if not set.
             * @return {Dejavu}    the dejavu object of current element.
             */
            update: function(b){

                if(b !== undefined) this[ns.po].UPDATE = !!b;

                this[ns.ch].length = 0;
                for(var i=0,cs=this.childNodes,len=cs.length;i<len;i++){
                    if(cs[i].nodeType != 1) continue;

                    if(i != this[ns.po].CURRENT) cs[i].setAttribute('hidden', 'hidden');
                    else cs[i].removeAttribute('hidden', 'hidden');

                    this[ns.ch].push(cs[i]);
                }
                this[ns.po].LENGTH = this[ns.ch].length;
                trace('[DEJAVU] updated as');
                trace(this[ns.ch]);

                var self = this;
                setTimeout(function(){
                    var rect = self.getBoundingClientRect(), sc = getS();
                    self[ns.po].MODEL = self[ns.po].MODEL || {};
                    self[ns.po].MODEL.top    = rect.top + sc.y;
                    self[ns.po].MODEL.bottom = rect.bottom + sc.y;
                    self[ns.po].MODEL.left   = rect.left + sc.x;
                    self[ns.po].MODEL.right  = rect.right + sc.x;
                    trace(self[ns.po].MODEL);
                }, 0);

                return this.dejavu;
            },
            /**
             * add dejavu event
             * @param  {[type]}   type [description]
             * @param  {Function} fn   [description]
             * @return {Dejavu}    the dejavu object of current element.
             */
            on: function(type, fn){
                //TODO
                return this.dejavu;
            },
            /**
             * remove dejavu event
             * @param  {[type]}   type [description]
             * @param  {Function} fn   [description]
             * @return {Dejavu}    the dejavu object of current element.
             */
            off: function(type, fn){
                //TODO
                return this.dejavu;
            },
            /**
             * trigger dejavu event
             * @param  {[type]}   type [description]
             */
            emit: function(type){
                //TODO
            }
        }

    //hidden property support for old browsers (IE < 11)
    if(typeof(d.hidden) === 'undefined')
        d.getElementsByTagName('head')[0].appendChild(mkel('style', function(){this.innerHTML = '*[hidden]{display:none;}'}));

    /**
     * Dejavu initialize function from any node you want.
     * @param  {mixed} root a node or nodes from any object. selector string.
     * @param  {object} op  options.
     * @return {mixed}      root
     */
    var Dejavu = function(root, op){

        if(!root) throw new Error('dejavu element(s) are not defined.');
        op = op || w.Dejavu.options;

        if(isS(root)) root = d.querySelectorAll(root) || d.getElementById(root);

        var _root = root, ext = function(a,p,m){a.dejavu[m] = function(){return p[m].apply(a, arguments)};};

        if(!isc(root)) root = [root];

        trace('[DEJAVU] Dejavu initialize');
        trace(root);trace(op);

        for(var idx = 0, max = root.length; idx < max; idx++){
            if(!root[idx] || ~inA(DEJAVU_AFFECTED, root[idx]) || root[idx].nodeType != 1) continue;

            root[idx][ns.ch] = [];
            root[idx][ns.op] = op;

            root[idx][ns.ev] = function(x, y){
                var po = this[ns.po];
                //trace([x,y,screenX,screenY,po.MARGIN,po.STATUS]);trace(po.MODEL);
                if(
                    (y + screenY - po.MARGIN) > po.MODEL.top && (y - po.MARGIN) < po.MODEL.bottom &&
                    (x + screenX - po.MARGIN) > po.MODEL.left && (x - po.MARGIN) < po.MODEL.right
                ){
                    if(!po.STATUS){
                        po.STATUS = true;
                        trace('[DEJAVU] in your eye side.');
                    }

                }else{
                    if(po.STATUS){
                        po.STATUS = false;
                        trace('[DEJAVU] out of your eye side.');
                        po.RANDOM ? this.dejavu.random() : this.dejavu.next();
                    }
                }
            };

            root[idx].dejavu = {};

            for(var m in met) ext(root[idx],met,m);
            for(var m in w.Dejavu.fn) ext(root[idx],w.Dejavu.fn,m);

            root[idx][ns.po] = {
                CURRENT: 0, LENGTH: 0, STATUS: false,
                ENABLED: 'enable' in op ? !!op.enable : w.Dejavu.options.enable,
                RANDOM:  'random' in op ? !!op.random : w.Dejavu.options.random,
                MARGIN:  !isNaN(op.margin) ? op.margin : w.Dejavu.options.margin,
                MODEL:   {top: 0, bottom: 0, right: 0, left: 0},
                UPDATE:  'update' in op ? !!op.update : w.Dejavu.options.update,
            };

            root[idx].dejavu.update();
            root[idx].dejavu.render();

            DEJAVU_AFFECTED.push(root[idx]);
        }

        return _root;
    };

    /**
     * destroy Dejavu object and return to plain object.
     * @param  {mixed} root a node or nodes from any object. selector string.
     * @return {mixed}      root
     */
    Dejavu.destroy = function(root){
        var _root = root;
        if(!isc(root)) root = [root];
        trace('[DEJAVU] Dejavu destroying');
        trace(root);
        for(var idx = 0, max = root.length; idx < max; idx++){
            if(!~inA(DEJAVU_AFFECTED, root[idx])) continue;
            for(var i=0,cs=root[idx].childNodes,len=cs.length;i<len;i++){
                if(cs.nodeType != 1) continue;

                cs[i].removeAttribute('hidden');
            }
            //delete root[idx].dejavu;
            root[idx].dejavu = undefined;
            for(var x in ns) root[idx][ns[x]] = undefined; //delete root[idx][ns[x]];
            DEJAVU_AFFECTED.splice(inA(root[idx]), 1);
        }
        return _root;
    };
    /**
     * dejavu options
     * enable: enable after initialze dejavu. default is true.
     * random: always move random slide when scroll outside element. default is false (move to next slide).
     * shuffle: shuffle slides afteer initialize dejavu. default is false.
     * update: always update when window resized. default is false.
     * oninit: additional initialize procedure if function set.
     * onoutside: emit event when client is not watch element completely.
     * oninside: emit event when client is starting for watch element.
     * onupdate: emit event when element position updated.
     * sort: the function that sort slide queue. default is null for not sort.
     * margin: when scrolling position is out of element position, allowed width of more out of position.
     * @type {Object}
     */
    Dejavu.options = {
        enable: true, random: false,
        shuffle: false, update: false,
        oninit: null,
        onoutside: null,
        oninside: null,
        onupdate: null,
        sort: null,
        margin: 10
    };
    /**
     * debug all dejavu objects.
     * @type {Boolean}
     */
    Dejavu.debug = false;
    /**
     * dejavu extension methods
     * @type {Object}
     */
    Dejavu.fn = {};

    //Dejavu global scroll event
    w[EVENT_FUNC](EVENT_ON + 'scroll', function(e){
        e = e || w.event;
        var sc = getS();
        for(var i=0,r=DEJAVU_AFFECTED,l=r.length;i<l;i++)
            r[i][ns.ev].call(r[i], sc.x, sc.y);
    });
    //Dejavu global resize event
    w[EVENT_FUNC](EVENT_ON + 'resize', function(){
        screenX = screen.availWidth;
        screenY = screen.availHeight;
    });

    //bind to global.
    w.Dejavu = Dejavu;

}(window,document);
