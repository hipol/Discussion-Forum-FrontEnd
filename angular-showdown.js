
angular.module('showdown', []);

angular.module('showdown').directive('showdown', function(showdown, showdownConfig, $http) {
  
  return {
    restrict: 'EA',
    link: function($scope, $element, $attrs) {
      
      var options = {
          defaultMarkdown: $element.text().replace(/^[ /t]+/g, '').replace(/\n[ /t]+/g, '\n'),
          markdown: undefined
      };
      
      function updateMarkdown(value) {
        options.markdown = value;
        showdown.updateElement($element, options);
      }
      
      $scope.$watch($attrs.showdown, updateMarkdown);
      $scope.$watch($attrs.showdownModel, updateMarkdown);
      
      $attrs.$observe('showdownSrc', function(value) {
        options.src = value;
        showdown.updateElement($element, options);
      });
    }
  };
  
});

angular.module('showdown').provider('showdownConfig', function() {
  var config = {
    extensions: [], 
    markdown: {
      loading: '# Loading ...',
      error: '# Error :('
    }
  };
  this.$get = function() { return config; };
});

angular.module('showdown').factory('showdown', function(showdownConfig, $http) {
  
  var _converter;
  
  function getConverter(options) {
    
    // options: { extensions: ['twitter', mine] }
    // TODO: Locate (and create) converter based on extensions
    
    _converter = _converter || new Showdown.converter(options);
    
    return _converter;
  }
  
  function makeHtml(options) {
    
    var opt = angular.extend({}, showdownConfig, options);
    
    var converter = getConverter(opt)
    
    return converter.makeHtml(opt.markdown || opt.defaultMarkdown);
  }
  
  function updateElement($element, options) {
    
    if(options.src) {
      
      $element.removeClass('showdown-loading-error');
      
      $http.get(options.src).then(function(response) {
        options.markdown = response.data;
        $element.removeClass('showdown-loading-error');
      })
      ['catch'](function() {
        $element.addClass('showdown-loading-error');
      })
      ['finally'](function() {
        $element.removeClass('showdown-loading');
        options.src = undefined;
        updateElement($element, options);
      });      
    } else {
      var html = makeHtml(options);
      $element.html(html);
    }
  
  }
  
  return {
    makeHtml: makeHtml,
    updateElement: updateElement
  };
});

