angular.module('LazyPanda.UI', ['ngAnimate'])
.controller('MainController', ['$timeout', function ($timeout) {
    var self = this;
    self.showColorPicker = false;
    self.settingsPaneColorsInitalized = false;
    self.colorModes = [
        { id: _.uniqueId('col'), colorId: "turquoise", name: "turquoise", code: "#1abc9c" },
        { id: _.uniqueId('col'), colorId: "emerland", name: "emerland", code: "#2ecc71" },
        { id: _.uniqueId('col'), colorId: "nephritis", name: "nephritis", code: "#27ae60" },
        { id: _.uniqueId('col'), colorId: "peterRiver", name: "peter river", code: "#3498db" },
        { id: _.uniqueId('col'), colorId: "wetAsphalt", name: "wet asphalt", code: "#34495e" },
        { id: _.uniqueId('col'), colorId: "amethyst", name: "amethyst", code: "#9b59b6" },
        { id: _.uniqueId('col'), colorId: "carrot", name: "carrot", code: "#e67e22" },
        { id: _.uniqueId('col'), colorId: "alizarin", name: "alizarin", code: "#e74c3c" },
        { id: _.uniqueId('col'), colorId: "pomegranate", name: "pomegranate", code: "#c0392b" }
    ];
    self.activeColorMode = self.colorModes[3];

    self.panmove = function (e) {
        e.pageX = e.center.x;
        e.pageY = e.center.y;
        self.mouseMove(e);
    }

    self.openColorPicker = function () {
        if (self.showColorPicker == false) {
            self.showColorPicker = true;
            self.settingsPaneColorsInitalized = true;
            self.shownColorModes = [];
            $timeout(function () {
                _.each(self.colorModes, function (cm, iter) {
                    self.shownColorModes.push(cm);
                    cm.transition = 'all ' + (50 + (150 * (iter + 1))) + 'ms' + ' ease-out';
                });
                _.each(self.colorModes, function (cm, iter) {
                    $timeout(function () {
                        var _elem = document.getElementById('color_' + cm.colorId);
                        _elem.style.transform = 'rotate(' + (-150 + (iter * 18)) + 'deg)';
                    }, 400);
                });
            }, 400);
        }
        else {
            self.showColorPicker = false;
            $timeout(function () {
                self.settingsPaneColorsInitalized = false;
                self.shownColorModes = [];
            }, 300);
        }
    }

    self.closeColorPicker = function () {
        self.showColorPicker = false;
        $timeout(function () {
            self.settingsPaneColorsInitalized = false;
            self.shownColorModes = [];
        }, 300);
    }

    self.choseColor = function (color) {
        self.activeColorMode = color;
    }

    self.goToContent = function () {
        var _contentElem = document.getElementById('portfolioContent');
        var _scrollTo = _contentElem.getBoundingClientRect().top;
        $('html, body').animate({
            scrollTop: _scrollTo
        }, 300);
    }

    self.lipRight = document.getElementById('panda-lip-right');
    self.lipLeft = document.getElementById('panda-lip-left');
    self.eyeRight = document.getElementById('panda-eye-right');
    self.eyeLeft = document.getElementById('panda-eye-left');
    self.mustacheRight = document.getElementById('panda-mustache-right');
    self.mustacheLeft = document.getElementById('panda-mustache-left');
    self.cap = document.getElementById('panda-cap');
    self.pictRect = document.getElementById('panda-pictrect');
    self.nose = document.getElementById('panda-nose');

    self.pandaHappy = false;
    self.pandaSad = false;
    self.pandaKungFu = false;

    TweenMax.set(self.cap, { scaleY: 0, scaleX: 0, transformOrigin: "center" });
    TweenMax.set(".panda-cap-lines", { opacity: 0 });
    TweenMax.set([self.mustacheRight, self.mustacheLeft], { opacity: 0 });

    self.makePandaHappy = function () {
        if (self.pandaKungFu == true) {
            self.pandaReset();
            $timeout(self.makePandaHappy, 1000);
        }
        else {
            TweenMax.set([self.mustacheRight, self.mustacheLeft], { opacity: 0 });
            self.timeline = new TimelineLite({});
            self.timeline
            .to(self.lipRight, 1, { rotation: -30, transformOrigin: "left top", })
            .to(self.lipLeft, 1, { rotation: 30, transformOrigin: "right top" }, "-=1")
            .to([self.eyeLeft, self.eyeRight], 1, { scaleY: 1.10, transformOrigin: "center" },"-=0.50")
            self.pandaHappy = true;
        }
    }

    self.makePandaSad = function () {
        if (self.pandaKungFu == true) {
            self.pandaReset();
            $timeout(self.makePandaSad, 1000);
        }
        else {
            TweenMax.to([self.eyeLeft, self.eyeRight], 0.33, { scaleY: 1, transformOrigin: "center" });
            TweenMax.set([self.mustacheRight, self.mustacheLeft], { opacity: 0 });
            self.timeline = new TimelineLite({});
            self.timeline
            .to(self.lipRight, 1, { rotation: 30, transformOrigin: "left top" })
            .to(self.lipLeft, 1, { rotation: -30, transformOrigin: "right top" }, "-=1");
            self.pandaSad = true;
        }
    }

    self.makePandaKungFu = function () {
        if (self.pandaKungFu == true || self.pandaHappy == true || self.pandaSad == true) {
            self.pandaReset();
            $timeout(self.makePandaKungFu, 1000);
        }
        else {
            self.timeline = new TimelineLite({});
            TweenMax.set(self.cap, { scaleY: 0, scaleX: 0, transformOrigin: "center" });
            TweenMax.set(".panda-cap-lines", { opacity: 0 });
            TweenMax.set(self.lipRight, { rotation: 0 });
            TweenMax.set(self.lipLeft, { rotation: 0 });
            TweenMax.set(".panda-cap-lines", { y: 120 });
            TweenMax.set([self.mustacheRight, self.mustacheLeft], { opacity: 1 });
            self.timeline
            .to(self.eyeLeft, 1, { scaleY: 0.40, transformOrigin: "center", ease: Power1.easeOut })
            .to(self.eyeRight, 1, { scaleY: 0.40, transformOrigin: "center", ease: Power1.easeOut }, "-=1")
            .to(self.mustacheRight, 1, { rotation: -90, transformOrigin: "right top", ease: Elastic.easeOut.config(2, 0.3) }, "-=1")
            .to(self.mustacheLeft, 1, { rotation: 90, transformOrigin: "left top", ease: Elastic.easeOut.config(2, 0.3) }, "-=1")
            .to(self.mustacheRight, 0.50, { scaleX: 0.50, scaleY: 0.50, }, "-=1")
            .to(self.mustacheLeft, 0.50, { scaleX: 0.50, scaleY: 0.50 }, "-=1")            
            .to(self.pictRect, 0.50, { scaleY: 0, transformOrigin: "center top", opacity: 0 }, "-=0.50")
            .to(self.cap, 0.50, { scaleY: 1, transformOrigin: "center", y: 120 }, "-=1.75")
            .to(self.cap, 0.50, { scaleX: 1, transformOrigin: "center" }, "-=0.50")
            .to(".panda-cap-lines", 0.50, { opacity: 1 }, "-=0.25");
            self.pandaKungFu = true;
        }
    }

    self.pandaReset = function () {
        TweenMax.to(".panda-cap-lines", 0.25, { opacity: 0 });
        TweenMax.to(self.cap, 0.25, { scaleY: 0, scaleX: 0, transformOrigin: "center" }).delay(0.25);
        TweenMax.to([self.eyeLeft, self.eyeRight], 1, { scaleY: 1, transformOrigin: "center" }, "-=0.50").delay(0.25);
        self.pandaKungFu = false;
        self.pandaHappy = false;
        self.pandaSad = false;
        if (self.timeline)
            self.timeline.reverse();
    }
    $timeout(self.makePandaSad, 500);

}]);