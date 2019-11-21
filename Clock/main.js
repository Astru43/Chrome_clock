(function () {

    var canvas = document.getElementById("MyCanvas");
    var holder = document.getElementById("holder");
    var doc = document.documentElement;
    var width, height;
    var ctx = canvas.getContext("2d");
	var Font;
	
    setVARS("30pt Fira Code");

    function setVARS(val) {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;

        ctx.fillStyle = "#f40af1";
        ctx.font = val;
        ctx.textAlign = "center";
		Font = val
    }
	
    var Pad = function Pad(val) {
        return val < 10 ? "0" + val : val;
    }
	
    function Time$() {
        ctx.clearRect(0, 0, width, height);
        var time = new Date();

        holder.setAttribute("data-hours", Pad(time.getHours()));
        holder.setAttribute("data-minutes", Pad(time.getMinutes()));
        holder.setAttribute("data-seconds", Pad(time.getSeconds()));

        Print();
        setTimeout(Time$, 10);
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
        setVARS(Font);
    }

	function fira_clicked (info) {
		if (info.menuItemId == 1 || info.menuItemId == "1") {
			setVARS("30pt Fira Code");
		} else if (info.menuItemId == 2 || info.menuItemId == "2") {
			setVARS("30pt Varela Round");
		}
	}
	
	chrome.contextMenus.onClicked.addListener(fira_clicked);

    Time$();
})()
