(function() {
    'use strict';

    function SocialService() {

        var facebookId;

        this.setFacebookID = function (id) {
            facebookId = id;
            return true;
        };


        this.$get = ['$window', '$q', function($window, $q) {
            var me = this;

            this._createScript = function() {

                $window.fbAsyncInit = function() {
                    FB.init({
                        appId: facebookId,
                        channelUrl: 'app/channel.html',
                        status: true,
                        xfbml: true
                    });
                };

                (function(d) {
                    var js,
                        id = 'facebook-jssdk',
                        ref = d.getElementsByTagName('script')[0];
                    if (d.getElementById(id)) {
                        return;
                    }

                    js = d.createElement('script');
                    js.id = id;
                    js.async = true;
                    js.src = "//connect.facebook.net/en_US/all.js";

                    ref.parentNode.insertBefore(js, ref);

                }(document));
            };

            this._feedData = function(params) {

                var deferred = $q.defer();

                FB.ui({
                    method: 'feed',
                    name: params.title || '',
                    link: params.link || '',
                    picture: params.image || '',
                    description: params.description || ''
                }, function(response){
                    deferred.resolve(response);
                });

                return deferred.promise;


            };

            this._createScript();

            return {
                feedData: function (params) {
                    return me._feedData(params);
                }
            }
        }];
    }

    function GigSocialDirective(GigSocial) {
        return {
            template: '<div class="social"><button class="btn-facebook button" ng-click="facebook()">Facebook</button><a ng-href="{{linkTwitter}}" target="_blank" class="btn-twitter button">Twitter</a></div>',
            replace: true,
            restrict: 'E',
            scope: {
                title: '@',
                link: '@',
                image: '@',
                description: '@',
                data: '='
            },
            link: function (scope, element, attr) {

                var params;

                if (scope.data) {
                    params = scope.data;
                } else {
                    params = {};
                    params.title = scope.title;
                    params.link = scope.link;
                    params.image = scope.image;
                    params.description = scope.description;
                }


                scope.facebook = function() {
                    GigSocial.feedData(params).then(function() {
                    });
                };

                var titleTwitter = params.title;
                var linkTwitter = params.link;

                scope.linkTwitter = 'https://twitter.com/share?text='+titleTwitter+'&url='+linkTwitter;

            }
        };
    }



    angular.module('gig-social', [])
        .provider('GigSocial', SocialService)
        .directive('gigSocial', GigSocialDirective);



})();
