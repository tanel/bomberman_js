// See http://melonjs.github.io/docs/me.HUD_Object.html
LivesObject = me.HUD_Item.extend({

   // constructor
   init: function(x, y) {
      // call the parent constructor
      this.parent(x, y);
      // create a font
      this.font = new me.Font("Verdana", 30, "red");
   },

   draw: function (context, x, y) {
      this.font.draw(context, "Lives: " + this.value, this.pos.x + x, this.pos.y + y);
   }
});