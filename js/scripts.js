var Lilac;
! function(e) {
  "use strict";
  e(document).ready(function() {
    (Lilac = {
      initialized: !1,
      mobMenuFlag: !1,
      wookHandler: null,
      wookOptions: null,
      scrollPos: 0,
      sendingMail: !1,
      mobileMenuTitle: mobileMenuTitle,
      hero100PercentHeight: hero100PercentHeight,
      twitter_username: twitter_username,
      map_canvas_id: map_canvas_id,
      map_color: map_color,
      map_initial_zoom: map_initial_zoom,
      map_initial_latitude: map_initial_latitude,
      map_initial_longitude: map_initial_longitude,
      use_default_map_style: use_default_map_style,
      contact_form_success_msg: contact_form_success_msg,
      contact_form_error_msg: contact_form_error_msg,
      c_days: c_days,
      c_hours: c_hours,
      c_minutes: c_minutes,
      c_seconds: c_seconds,
      countdownEndMsg: countdownEndMsg,
      init: function() {
        var e = this;
        e.initialized || (e.initialized = !0, e.build(), e.events())
      },
      build: function() {
        var t = this;
        t.preloader(), t.navigation(), t.createMobileMenu(), t.heroHeight(), t.curvedText(), e("input, textarea").placeholder(), t.bgImageGrid(), t.googleMap(), t.createPrettyPhoto(), t.createOwlSliders(), t.createGallery(), t.countdown(), t.parallaxItems(), t.startNiceScroll()
      },
      events: function() {
        var e = this;
        e.windowResize(), e.resizeVideos(), e.contactForm(), e.buttons(), e.animateElems()
      },
      preloader: function() {
        var t = setInterval(function() {
          /loaded|complete/.test(document.readyState) && (clearInterval(t), e("#preloader").fadeOut(500))
        }, 10)
      },
      navigation: function() {
        e(".nav li a").on("click", function(t) {
          var a = e(this),
            i = 0;
          "#" === a.attr("href").charAt(0) ? (t.preventDefault(), "#home" !== a.attr("href") && (i = e(a.attr("href")).offset().top - 65), e("html, body").stop().animate({
            scrollTop: i
          }, 1500, "easeInOutExpo", function() {
            a.blur()
          })) : window.open(a.attr("href"), "_self")
        });
        var t = new Waypoint.Sticky({
          element: e(".nav-section")
        });
        t = t, e("#wrapper > section").waypoint({
          handler: function(t) {
            var a = e(this),
              i = a[0].element.id;
            "up" === t && (i = a[0].element.previousElementSibling.id), e(".nav a").removeClass("active"), e('nav a[href="#' + i + '"]').addClass("active")
          },
          offset: "50%"
        }), e(window).load(function() {
          var a = location.hash.replace("#", "");
          "" !== a && (location.hash = "", e("html, body").stop().animate({
            scrollTop: e("#" + a).offset().top - 65
          }, 1500, "easeInOutExpo")), t = new Waypoint.Sticky({
            element: e(".nav-section")
          })
        })
      },
      createMobileMenu: function(t) {
        var a, i, n = this,
          s = e("#wrapper");
        i = e.browser.mobile ? "touchstart" : "click", null !== t && (t = e(window).innerWidth()), t <= 975 && !n.mobMenuFlag && (e("body").prepend('<nav class="nav-mobile"><i class="fa fa-times"></i><h2><i class="fa fa-bars"></i>' + n.mobileMenuTitle + "</h2><ul></ul></nav>"), e(".nav-mobile > ul").html(e(".nav").html()), e(".nav-mobile b").remove(), e(".nav-mobile ul.dropdown-menu").removeClass().addClass("dropdown-mobile"), a = e(".nav-mobile"), e("#nav-mobile-btn").bind(i, function(t) {
          t.stopPropagation(), t.preventDefault(), setTimeout(function() {
            s.addClass("open"), a.addClass("open"), a.getNiceScroll().show()
          }, 25), e(document).bind(i, function(t) {
            e(t.target).hasClass("nav-mobile") || e(t.target).parents(".nav-mobile").length || (s.removeClass("open"), a.removeClass("open"), e(document).unbind(i))
          }), e(">i", a).bind(i, function() {
            a.getNiceScroll().hide(), s.removeClass("open"), a.removeClass("open"), e(document).unbind(i)
          })
        }), a.niceScroll({
          autohidemode: !0,
          cursorcolor: "#888888",
          cursoropacitymax: "0.7",
          cursorwidth: 10,
          cursorborder: "0px solid #000",
          horizrailenabled: !1,
          zindex: "1"
        }), a.getNiceScroll().hide(), n.mobMenuFlag = !0, e(".nav-mobile li a").bind("click", function(t) {
          var n = e(this),
            o = 0;
          "#home" !== n.attr("href") && (o = e(n.attr("href")).offset().top - 65), e("html, body").stop().animate({
            scrollTop: o
          }, 1500, "easeInOutExpo", function() {
            n.blur()
          }), a.getNiceScroll().hide(), s.removeClass("open"), a.removeClass("open"), e(document).unbind(i), t.preventDefault()
        }))
      },
      heroHeight: function() {
        this.hero100PercentHeight && (e("#home").css({
          minHeight: e(window).innerHeight() + "px"
        }), e(window).resize(function() {
          e("#home").css({
            minHeight: e(window).innerHeight() + "px"
          })
        }))
      },
      bgImageGrid: function() {
        if (e("#freewall").length) {
          e("#freewall .item").each(function() {
            var t = e(this);
            t.width(Math.floor(260 + 200 * Math.random())), t.css({
              "background-image": "url(" + e(">img", t).attr("src") + ")"
            }), e(">img", t).remove()
          }), e("#freewall").appendTo("#wrapper");
          var t = new Freewall("#freewall");
          t.reset({
            selector: ".item",
            animate: !1,
            cellW: 20,
            gutterX: 0,
            gutterY: 0,
            onResize: function() {
              t.fitWidth()
            }
          }), t.fitWidth()
        }
      },
      googleMap: function() {
        if (0 === e("#map_canvas").length || "undefined" === map_markers || 0 === map_markers.length) return !1;
        var t, a, i, n, s, o = this,
          r = [],
          l = 0;
        for (/^\d|\.|-$/.test(o.map_initial_latitude) && /^\d|\.|-$/.test(map_initial_longitude) || (o.map_initial_latitude = map_markers[0].latitude, o.map_initial_longitude = map_markers[0].longitude), a = new google.maps.LatLng(o.map_initial_latitude, o.map_initial_longitude), this.use_default_map_style || (r = [{
            stylers: [{
              hue: map_color
            }, {
              saturation: -75
            }, {
              lightness: 5
            }]
          }, {
            featureType: "administrative",
            elementType: "labels.text.fill",
            stylers: [{
              saturation: 20
            }, {
              lightness: -70
            }]
          }, {
            featureType: "water",
            elementType: "geometry",
            stylers: [{
              saturation: -50
            }, {
              lightness: 40
            }]
          }, {
            featureType: "road",
            elementType: "geometry",
            stylers: [{
              hue: map_color
            }, {
              saturation: -100
            }, {
              lightness: 0
            }]
          }, {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{
              hue: map_color
            }, {
              saturation: 5
            }, {
              lightness: 5
            }]
          }, {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{
              saturation: 10
            }, {
              lightness: 0
            }]
          }, {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{
              saturation: 0
            }, {
              lightness: 20
            }]
          }, {
            featureType: "transit",
            elementType: "geometry",
            stylers: [{
              hue: map_color
            }, {
              saturation: 30
            }, {
              lightness: -30
            }]
          }]), t = new google.maps.StyledMapType(r, {
            name: "Lilac"
          }), i = {
            center: a,
            zoom: o.map_initial_zoom,
            scrollwheel: !1,
            panControl: !1,
            mapTypeControl: !1,
            zoomControl: !0,
            zoomControlOptions: {
              position: google.maps.ControlPosition.RIGHT_CENTER
            }
          }, (n = new google.maps.Map(document.getElementById(o.map_canvas_id), i)).mapTypes.set("map_style", t), n.setMapTypeId("map_style"), s = function(e) {
            var t = e.latitude,
              a = e.longitude,
              i = e.icon,
              s = e.infoWindow,
              o = new google.maps.InfoWindow({
                content: '<div class="infoWindow">' + s + "</div>"
              }),
              r = new RichMarker({
                position: new google.maps.LatLng(t, a),
                map: n,
                anchor: 8,
                anchorPoint: new google.maps.Point(0, -40),
                shadow: "none",
                content: '<div class="marker"><i class="fa ' + i + '"></i></div>'
              });
            google.maps.event.addListener(r, "click", function() {
              o.open(n, r)
            })
          }; l < map_markers.length;) s(map_markers[l]), l += 1
      },
      createPrettyPhoto: function() {
        e("a[data-gal^='prettyPhoto']").prettyPhoto({
          theme: "lilac",
          hook: "data-gal"
        })
      },
      createOwlSliders: function() {
        e(".timeline-gallery").length && e(".timeline-gallery").owlCarousel({
          navigation: !0,
          navigationText: !1,
          pagination: !1,
          itemsCustom: [
            [0, 1],
            [392, 2],
            [596, 3],
            [751, 2],
            [975, 3],
            [1183, 3],
            [1440, 3],
            [1728, 3]
          ]
        }), e(".bridesmaids-groomsmen-slider").length && e(".bridesmaids-groomsmen-slider").owlCarousel({
          itemsCustom: [
            [0, 1],
            [590, 2],
            [751, 2],
            [975, 3],
            [1183, 4],
            [1440, 4],
            [1728, 4]
          ]
        })
      },
      createGallery: function() {
        var t = e(".gallery-scroller"),
          a = !1;
        e(".gallery-right").click(function() {
          if (a) return !1;
          a = !0, t.animate({
            scrollLeft: t.scrollLeft() + 380
          }, function() {
            a = !1
          })
        }), e(".gallery-left").click(function() {
          if (a) return !1;
          a = !0, t.animate({
            scrollLeft: t.scrollLeft() - 380
          }, function() {
            a = !1
          })
        })
      },
      curvedText: function() {
        e(".curve").length && (e(".curve").arctext({
          radius: 1e3
        }), e(window).resize(function() {
          e(".curve").arctext("set", {
            radius: 1e3
          })
        })), e(".curve2").length && (e(".curve2").arctext({
          radius: 800,
          dir: -1
        }), e(window).resize(function() {
          e(".curve2").arctext("set", {
            radius: 800,
            dir: -1
          })
        }))
      },
      countdown: function(t, a) {
        var i, n = this,
          s = new Date(a),
          o = e("" + t);
        o.html('<div class="days"><span>' + n.c_days + '</span><div></div></div><div class="hours"><span>' + n.c_hours + '</span><div></div></div><div class="minutes"><span>' + n.c_minutes + '</span><div></div></div><div class="seconds"><span>' + n.c_seconds + "</span><div></div></div>"), i = setInterval(function() {
          var t = new Date,
            a = s - t;
          if (a < 0) return o.html('<div class="end">' + n.countdownEndMsg + "</div>"), clearInterval(i), !1;
          var r = Math.floor(a / 864e5 * 1),
            l = Math.floor(a % 864e5 / 36e5 * 1),
            c = Math.floor(a % 864e5 % 36e5 / 6e4 * 1),
            d = Math.floor(a % 864e5 % 36e5 % 6e4 / 1e3 * 1);
          e(".days > div", o).html(r), e(".hours > div", o).html(l), e(".minutes > div", o).html(c), e(".seconds > div", o).html(d)
        }, 1e3)
      },
      parallaxItems: function() {
        e.browser.mobile ? e(".parallax").css({
          "background-position": "50% 50%",
          "background-size": "cover",
          "background-attachment": "scroll"
        }) : e.stellar()
      },
      startNiceScroll: function() {
        e(document).ready(function() {
          e(".gallery-scroller").niceScroll({
            cursorcolor: "#fff",
            cursorwidth: "0px",
            background: "#fff",
            cursorborder: "0px solid #1F2326",
            zindex: "999",
            autohidemode: !1,
            enablemousewheel: !1,
            touchbehavior: !0
          })
        })
      },
      windowResize: function() {
        var t = this;
        e(window).resize(function() {
          var a = e(window).innerWidth();
          t.createMobileMenu(a)
        })
      },
      resizeVideos: function() {
        var t = e("iframe[src^='http://player.vimeo.com'], iframe[src^='https://player.vimeo.com'], iframe[src^='http://www.youtube.com'], iframe[src^='https://www.youtube.com'], object, embed"),
          a = e(".videoEmbed");
        t.each(function() {
          var t = e(this);
          t.attr("data-aspectRatio", t.height() / t.width()).removeAttr("height").removeAttr("width")
        }), e(window).resize(function() {
          var i = a.width();
          t.each(function() {
            var t = e(this);
            t.width(i).height(i * t.attr("data-aspectRatio"))
          })
        }).resize()
      },
      contactForm: function() {
        var t = this;
        e(".submit_form").click(function(a) {
          a.preventDefault();
          var i, n, s, o, r = e(this),
            l = r.closest("form"),
            c = e("input, textarea, .radio-lilac", l),
            d = 0,
            m = /\S+@\S+\.\S+/,
            u = "contact",
            h = !1,
            f = [];
          return o = function(e) {
            return encodeURIComponent(e)
          }, c.each(function() {
            var t = e(this);
            "hidden" === t.attr("type") ? t.hasClass("subject") ? u += "&subject=" + o(t.val()) : t.hasClass("fromName") || t.hasClass("fromname") ? u += "&fromname=" + o(t.val()) : t.hasClass("fromEmail") || t.hasClass("fromemail") ? u += "&fromemail=" + o(t.val()) : (t.hasClass("emailTo") || t.hasClass("emailto")) && (u += "&emailto=" + o(t.val())) : t.hasClass("required") && "" === t.val() ? (t.addClass("invalid"), h = !0) : "email" === t.attr("type") && "" !== t.val() && !1 === m.test(t.val()) ? (t.addClass("invalid"), h = !0) : "recaptcha_response_field" !== t.attr("id") && (t.removeClass("invalid"), t.hasClass("subject") ? (u += "&subject=" + o(t.val()), u += "&subject_label=" + t.attr("name")) : t.hasClass("fromName") || t.hasClass("fromname") ? (u += "&fromname=" + o(t.val()), u += "&fromname_label=" + t.attr("name")) : t.hasClass("fromEmail") || t.hasClass("fromemail") ? (u += "&fromemail=" + o(t.val()), u += "&fromemail_label=" + t.attr("name")) : t.hasClass("radio-lilac") ? (u += "&field" + d + "_label=" + t.data("value"), u += "&field" + d + "_value=" + e(".active", t).data("value"), d += 1) : (u += "&field" + d + "_label=" + t.attr("name"), u += "&field" + d + "_value=" + o(t.val()), d += 1))
          }), u += "&len=" + d, i = function() {
            r.width(r.width()), e("i", r).each(function() {
              var t = e(this),
                a = t.attr("class");
              t.removeClass(a).addClass("fa fa-times").delay(1500).queue(function(t) {
                e(this).removeClass("fa fa-times").addClass(a), t()
              })
            }), r.addClass("btn-danger").delay(1500).queue(function(t) {
              e(this).removeClass("btn-danger"), t()
            }), e(".form_status_message").html('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + contact_form_error_msg + "</div>")
          }, n = function() {
            r.width(r.width()), e("i", r).each(function() {
              var t = e(this),
                a = t.attr("class");
              t.removeClass(a).addClass("fa fa-check").delay(1500).queue(function(t) {
                e(this).removeClass("fa fa-check").addClass(a), t()
              })
            }), r.addClass("btn-success").delay(1500).queue(function(t) {
              e(this).removeClass("btn-success"), t()
            }), e(".form_status_message").html('<div class="alert alert-success alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + contact_form_success_msg + "</div>")
          }, s = function() {
            e("i", r).each(function(t) {
              e(this).removeClass("fa fa-cog fa-spin").addClass(f[t])
            }), r.removeClass("disabled")
          }, h || t.sendingMail ? i() : (t.sendingMail = !0, e("i", r).each(function(t) {
            var a = e(this);
            f[t] = a.attr("class"), a.removeClass(f[t]).addClass("fa fa-cog fa-spin")
          }), r.addClass("disabled"), e.ajax({
            type: "POST",
            url: "//formspree.io/bijaya.krishna.31@gmail.com",
            data: u,
            success: function(e) {
              s(), "ok" === e ? (n(), l[0].reset()) : i(), t.sendingMail = !1
            },
            error: function() {
              s(), i(), t.sendingMail = !1
            }
          })), !1
        })
      },
      buttons: function() {
        var t = !0;
        e(".bridesmaids-groomsmen-buttons .btn").click(function(a) {
          a.preventDefault();
          var i = e(this),
            n = i.data("slider");
          i.hasClass("active") || (e(".bridesmaids-groomsmen-slider").addClass("hide").css({
            opacity: 0
          }), t ? (t = !1, e("#" + n).removeClass("hide")) : e("#" + n).removeClass("hide").animate({
            opacity: 1
          }, 500)), e(".bridesmaids-groomsmen-buttons .btn").removeClass("active"), i.addClass("active")
        }), e(".radio-lilac button").click(function(t) {
          t.preventDefault();
          var a = e(this);
          if (a.hasClass("active")) return !1;
          a.parent().find("button").removeClass("active"), a.addClass("active")
        }), e(".add_button").click(function(t) {
          t.preventDefault();
          var a, i = e(this),
            n = i.data("wrapper"),
            s = parseInt(e("#" + n).data("count")) + 1 || 1,
            o = e("#" + i.data("input")),
            r = o.val();
          if ("" === r) return o.addClass("invalid"), !1;
          a = '<div class="input-group"><input type="text" class="form-control" name="' + i.data("input") + "_" + s + '" value="' + r + '" /><span class="input-group-addon"><i class="fa fa-trash"></i></span></div>', e("#" + n).data("count", s).append(a), o.val(""), o.removeClass("invalid")
        }), e(".add_list").on("click", ".input-group-addon", function() {
          e(this).closest(".input-group").remove()
        })
      },
      animateElems: function() {
        if (e.browser.mobile) return !1;
        var t = function() {
          e("[data-animation-delay]").each(function() {
            var t = e(this),
              a = e(window).scrollTop(),
              i = e(window).height(),
              n = parseInt(t.attr("data-animation-delay"), 10),
              s = t.data("animation-direction");
            if (void 0 === s) return !1;
            t.addClass("animate-" + s), a + i >= t.offset().top && (isNaN(n) || 0 === n ? t.removeClass("animate-" + s).addClass("animation-" + s) : setTimeout(function() {
              t.removeClass("animate-me").addClass("animation-" + s)
            }, n))
          })
        };
        e(window).innerWidth() >= 751 && (e(window).scroll(function() {
          t()
        }), t())
      }
    }).init()
  })
}(jQuery);
