
(function( $ ) {

  $.fn.imageness = function() {

    var canvas = document.createElement('canvas');
    if (!canvas.getContext) {
      // not supported
      return;
    }

    this.each(function() {
      var self = $( this );

      var bg = self.css('background-image');
      bg = bg.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
      if ( bg = '' ) {
        return true;
      }

      var img = document.createElement("img");
      img.src = imageSrc;
      img.style.display = "none";
      document.body.appendChild(img);

      var colorSum = 0;

      img.onload = function() {

        // create canvas
        var canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(this,0,0);

        //var imageDataTop = ctx.getImageData(0,0,canvas.width,canvas.height/2);
        //var imageDataBottom = ctx.getImageData(0,canvas.height/2,canvas.width,canvas.height/2);
        imageData = ctx.getImageData(0,canvas.height/2,canvas.width,canvas.height/2);

        var data = imageData.data;
        var r,g,b,avg;

        for(var x = 0, len = data.length; x < len; x+=4) {
          r = data[x];
          g = data[x+1];
          b = data[x+2];

          avg = Math.floor((r+g+b)/3);
          colorSum += avg;
        }

        var brightness = Math.floor(colorSum / (this.width*this.height));
        if ( brightness > 120 ) {
          self.addClas('dark-bg');
        } else {
          self.addClas('light-bg');
        }
      }
    });

    return this;

  };

}( jQuery ));
