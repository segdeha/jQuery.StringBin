/**
 * jQuery.StringBin - key/value storage in the cloud
 * @author Andrew Hedges, andrew@hedges.name
 * @created 2010-10-18 12:00:00
 * @license MIT, http://www.opensource.org/licenses/mit-license.php
 * @requires jQuery
 */

/*

StringBin is a web service that allows you to store key/value pairs in 'the cloud'.
jQuery.stringbin uses window.localStorage for the same thing, using StringBin as the
fallback strategy for browsers that do not support it.

To use jQuery.stringbin, you will need a StringBin API key. Get one here: http://stringbin.com

jQuery.stringbin has a simple interface, mostly mirroring the StringBin API:

    jQuery.stringbin.init(apikey)
    jQuery.stringbin.read(key[, callback])
    jQuery.stringbin.write(key, value[, callback])
    jQuery.stringbin.destroy(key[, callback])

jQuery.stringbin will behave differently based on the value of the 'callback' parameter.
If callback is a function, the function will be executed with the return value from
StringBin.com as the only argument. If the callback is a string, a JSONP request will
be made that calls the function named by the callback parameter upon returning.

read:

$.ajax({
  dataType: "jsonp",
  url: "http://api.stringbin.com/1/read?pin=t6BmN0Iw567L1MY&key=MikeGrace",
  success: function(data) {
    $('body').append("<h1>String: "+data.string+"</h1>");
  }
});

write:

$.ajax({
  dataType: "jsonp",
  url: "http://api.stringbin.com/1/write?pin=t6BmN0Iw567L1MY&key=MikeGrace&value=creator",
  success: function(data) {
    $('body').append("<h1>Error Saving? "+data.error+"</h1>");
  }
});

*/

;(function ($, undefined) {
    var loc, uri, stringbin

    loc    = window.localStorage
    uri    = 'http://api.stringbin.com/'

    function request_(opts) {
        $.ajax(opts)
    }

    function compose_(action, key, value, callback) {
        var url, opts
        opts = {
            url  : uri + action,
            data : {
                pin : stringbin.pin,
                key : key
            }
        }
        if (value !== undefined)
            opts.data.value = value
        if ('string' === typeof callback) {
            opts.dataType      = 'jsonp'
            opts.data.callback = callback
        } else if ('function' === typeof callback) {
            opts.success = callback
        }
        return opts
    }

    function localGet_(key, callback) {
        // get from localStorage
    }

    function localSet_(key, value, callback) {
        // set to localStorage
    }

    function localDestroy_(key, callback) {
        // delete from localStorage
    }

    function StringBin() {
        this.hasLocalStorage = undefined === loc
    }

    StringBin.prototype = {
        init : function (apikey) {
            this.pin = pin
        },
        read : function (key, callback) {
            if (this.hasLocalStorage)
                localGet_(key, callback)
            else
                request_(compose_('read', key, undefined, callback))
        },
        write : function (key, value, callback) {
            if (this.hasLocalStorage)
                localSet_(key, callback)
            else
                request_(compose_('write', key, value, callback))
        },
        destroy : function (key, callback) {
            this.write(key, '', callback)
        }
    }

    stringbin = new StringBing() {}

    // expose public method
    $.extend({
        stringbin : stringbin
    })
})(jQuery);