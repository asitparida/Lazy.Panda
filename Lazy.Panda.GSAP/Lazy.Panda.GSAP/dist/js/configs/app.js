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

    self.makePandaHappy = function () {
        TweenMax.set(self.lipRight, { y: 0, x: 3 });
        TweenMax.set(self.lipLeft, { y: 20, x: 40 });
        self.timeline = new TimelineLite({});
        self.timeline
        .to(self.lipRight, 1, { rotation: -30, transformOrigin: "left top" })
        .to(self.lipLeft, 1, { rotation: 30, transformOrigin: "right top" }, "-=1");
    }

    self.makePandaSad = function () {
        TweenMax.set(self.lipRight, { y: -1, x: 1 });
        TweenMax.set(self.lipLeft, { y: 18, x: 40 });
        self.timeline = new TimelineLite({});
        self.timeline
        .to(self.lipRight, 1, { rotation: 30, transformOrigin: "left top" })
        .to(self.lipLeft, 1, { rotation: -30, transformOrigin: "right top" }, "-=1");
    }


}]);