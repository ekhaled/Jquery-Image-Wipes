(function(a){var b=function(a,b){var c=[],d=0;for(var e=0;e<a;e++){c[e]=Array(b);for(var f=0;f<b;f++)c[e][f]=d,d++}return c},c=function(a,c){var d=[],e=b(a,c),f,g=(f=e[0].length)%2==0,h=Math.floor((f-1)/2),i=[];for(var j=0;j<a;j++){var k=h+f*j;i.push(k),g&&i.push(k+1)}d.push(i);var l=i[0],m=0;for(var n=l-1;n>-1;n--){var o=[];m=m+2;for(var j=0;j<a;j++)o.push(n+j*f,n+j*f+m+(g?1:0));d.push(o)}return d},d=function(a,c,d){var e=[],f=b(a,c);if(d)for(var g=1-a;g<c;g++){var h=[];for(var i=0;i<a;i++)g+i>=0&&g+i<c&&h.push(f[i][g+i]);e.push(h)}else for(var g=0;g<a+c-1;g++){var j=g<c?0:g-c+1,k=g<a?0:g-a+1,h=[];for(var i=g-k;i>=j;i--)h.push(f[i][g-i]);e.push(h)}return e},e=a.fn.wipeImages,f=e.wipeFactory;a.fn.wipeImages.wipes=a.extend(a.fn.wipeImages.wipes,{diagTopLeft:function(a){var b={cols:8,rows:4},c=new f(a,b);c.groups=d(b.rows,b.cols),c.isGrouped=!0,c.run()},diagTopRight:function(a){var b={cols:8,rows:4},c=new f(a,b);c.groups=d(b.rows,b.cols,!0).reverse(),c.isGrouped=!0,c.run()},diagBottomRight:function(a){var b={cols:8,rows:4},c=new f(a,b);c.groups=d(b.rows,b.cols).reverse(),c.isGrouped=!0,c.run()},diagBottomLeft:function(a){var b={cols:8,rows:4},c=new f(a,b);c.groups=d(b.rows,b.cols,!0),c.isGrouped=!0,c.run()},fromCenter:function(a){var b={cols:10,rows:1},d=new f(a,b);d.groups=c(b.rows,b.cols),d.isGrouped=!0,d.run()},toCenter:function(a){var b={cols:9,rows:1},d=new f(a,b);d.groups=c(b.rows,b.cols).reverse(),d.isGrouped=!0,d.run()}})})(jQuery);
