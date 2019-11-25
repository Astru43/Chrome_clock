(function () {

    var canvas = document.getElementById("MyCanvas");
    var holder = document.getElementById("holder");
    var doc = document.documentElement;
    var ctx = canvas.getContext("2d");
    var width, height;
	
	var index = 0;
	
	var color = {
		_default: 0xffffff,
		purple : 0xf40af1,
		red: 0xff0000,
		green: 0x00ff00,
		blue: 0x0000ff,
	};
	
	var fonts = {
		fira_code: "30pt Fira Code",
		varela_round: "30pt Varela Round",
	};
	
	var color_mode = {
		shift: 1,
		white: 2,
		purple: 3,
	};
	
	var _fonts = fonts.fira_code;
	var _color_mode = color_mode.white;
	
	var nowColor = color._default;
	var newColor = color.red;
	
    var Pad = function Pad(val) {
        return val < 10 ? "0" + val : val;
    }
	
    function setVARS(val) {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;

        ctx.fillStyle = formatNowColor();
        ctx.font = val;
        ctx.textAlign = "center";
    }
	
    function Time$() {
        ctx.clearRect(0, 0, width, height);
		var time = new Date();

        holder.setAttribute("data-hours", Pad(time.getHours()));
        holder.setAttribute("data-minutes", Pad(time.getMinutes()));
        holder.setAttribute("data-seconds", Pad(time.getSeconds()));

        Print();
    }
	
    function Print() {
        ctx.fillText(holder.getAttribute("data-minutes"), width / 2, height / 2 + 13);
        for (let i = 0; i < 2; i++) {
            let val = 40;
            if (i) val = -40;
            ctx.fillText(":", width / 2 + (val), height / 2 + 13);
        }
        for (let i = 0; i < 2; i++) {
            let str = holder.getAttribute("data-seconds");
            let val = 80;
            if (i) {
                val = -80;
                str = holder.getAttribute("data-hours");
            }
            ctx.fillText(str, width / 2 + (val), height / 2 + 13);
        }
    }

    window.onresize = function (Event) {
        setVARS(_fonts);
    }

	function menu_clicked (info) {
		switch(info.menuItemId) {
		case "2":
			_fonts = fonts.fira_code;
			setVARS(_fonts);
			break;
		case "3":
			_fonts = fonts.varela_round;
			setVARS(_fonts);
			break;
		case "5":
			_color_mode = color_mode.white;
			break;
		case "6":
			_color_mode = color_mode.shift;
			break;
		case "7":
			_color_mode = color_mode.purple;
			break;
		}
	}
	
	function getNewColor() {
		var red_now = (nowColor & 0xff0000) >> 16;
		var red_new	= (newColor & 0xff0000) >> 16;
		
		var green_now = (nowColor & 0x00ff00) >> 8;
		var green_new = (newColor & 0x00ff00) >> 8;
		
		var blue_now = nowColor & 0x0000ff;
		var blue_new = newColor & 0x0000ff;
		
		if (red_now != red_new)
			var red_now = red_now > red_new ? red_now-1 : red_now+1;
		if (green_now != green_new)
			var green_now = green_now > green_new ? green_now-1 : green_now+1;
		if (blue_now != blue_new)
			var blue_now = blue_now > blue_new ? blue_now-1 : blue_now+1;
		
		nowColor = (red_now<<16) | (green_now<<8) | blue_now;
		
		var hexRed = red_now.toString(16);
		hexRed = hexRed.length < 2 ? 0 + hexRed : hexRed;
		
		var hexGreen = green_now.toString(16);
		hexGreen = hexGreen.length < 2 ? 0 + hexGreen : hexGreen;
		
		var hexBlue = blue_now.toString(16);
		hexBlue = hexBlue.length < 2 ? 0 + hexBlue : hexBlue;
		
		ctx.fillStyle = "#"+hexRed+hexGreen+hexBlue;
	}
	
	function formatNowColor () {
		var red_now = (nowColor & 0xff0000) >> 16;
		var green_now = (nowColor & 0x00ff00) >> 8;
		var blue_now = nowColor & 0x0000ff;
		
		var hexRed = red_now.toString(16);
		hexRed = hexRed.length < 2 ? 0 + hexRed : hexRed;
		
		var hexGreen = green_now.toString(16);
		hexGreen = hexGreen.length < 2 ? 0 + hexGreen : hexGreen;
		
		var hexBlue = blue_now.toString(16);
		hexBlue = hexBlue.length < 2 ? 0 + hexBlue : hexBlue;
		
		ctx.fillStyle = "#" + hexRed + hexGreen + hexBlue;
	}
	
	function color$() {
		switch (_color_mode) {
		case 1:
			switch (index) {
			case 0:
				if (nowColor == newColor) {
					index++;
					newColor = color.blue;
				} else {
					getNewColor();
					break;
				}			
				formatNowColor();
				break;
			case 1:
				if (nowColor == newColor) {
					index++;
					newColor = color.red;
				} else {
					getNewColor();
					break;
				}
				formatNowColor();
				break;
			case 2:
				if (nowColor == newColor) {
					index = 0;
					newColor = color.green;
				} else {
					getNewColor();
					break;
				}			
				formatNowColor();
				break;
			}
			break;
		case 2:
			nowColor = color._default;
			newColor = color.red;
			index = 2;
			ctx.fillStyle = formatNowColor();
			break;
		case 3:
			nowColor = color.purple;
			newColor = color.red;
			index = 2;
			ctx.fillStyle = formatNowColor();
			break;
		}
	}
	
    setVARS(_fonts);
	chrome.contextMenus.onClicked.addListener(menu_clicked);
	setInterval(color$, 10);
	setInterval(Time$ ,10);
})()
