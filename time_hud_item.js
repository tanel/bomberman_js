// See http://melonjs.github.io/docs/me.HUD_Object.html
TimeHudItem = me.HUD_Item.extend({

   init: function(x, y) {
      this.parent(x, y);
      this.font = new me.Font("Cursive", 30, "yellow");
   },

   draw: function (context, x, y) {
      this.font.draw(context, "Time left: " + this.value, this.pos.x + x, this.pos.y + y);
   }
});