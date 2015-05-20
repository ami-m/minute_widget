(function($, undefined){				
			$.fn.minuteWidget = function( options ) {
			
			function nop() {}
			
			function posInt(n) {
				n = parseInt(n, 10);
				if(!(0 < n)) {
					return 0;
				}
				return n;
			}
			
			function toMinutes(h, m) {
				h = posInt(h);
				m = posInt(m);
				return ((60*h) + m);
			}
			
			function toParts(m) {
				m = posInt(m);
				return [
					m % 60,
					parseInt(m/60, 10)
				];
			}
			
			function updateSlidersFromInput(minutesInput, minutesSlider, hoursSlider, minutesVal, hoursVal) {
				var m = minutesInput.val();
				var parts = toParts(m);
				minutesSlider.val(parts[0]);
				hoursSlider.val(parts[1]);
				minutesVal.text(parts[0]);
				hoursVal.text(parts[1]);
			}
			
			function updateInputFromSliders(minutesInput, minutesSlider, hoursSlider) {
				var m = minutesSlider.val();
				var h = hoursSlider.val();
				minutesInput.val(toMinutes(h, m));
			}
			
			function getCurrentValues(minutesInput, minutesSlider, hoursSlider) {
				var m = posInt(minutesSlider.val());
				var h = posInt(hoursSlider.val());
				var raw = toMinutes(h, m);
				return {
					raw: raw,
					minutes: m,
					hours: h
				};
			}
			
			function doOnChange(minutesInput, minutesSlider, hoursSlider) {
				if("function" === typeof(settings.onChange)) {
					settings.onChange(getCurrentValues(minutesInput, minutesSlider, hoursSlider));
				}
			}
			
			function buildTheDOM(minutesInput, minutesVal, minutesSlider, minutesLabel, hoursVal, hoursSlider, hoursLabel) {
				minutesInput.hide();
				var widget = $("<div class='"+writeClassAttr("widgetClass")+"'></div>");
				var minutesContainer = $("<div class='"+writeClassAttr("minutesContainerClass")+"'></div>");
				var hoursContainer = $("<div class='"+writeClassAttr("hoursContainerClass")+"'></div>");
				minutesLabel.append(minutesVal);
				minutesContainer.append(minutesSlider);
				minutesContainer.append(minutesLabel);
				hoursLabel.append(hoursVal);
				hoursContainer.append(hoursSlider);
				hoursContainer.append(hoursLabel);
				widget.append(minutesContainer);
				widget.append(hoursContainer);
				minutesInput.after(widget);
				updateSlidersFromInput(minutesInput, minutesSlider, hoursSlider, minutesVal, hoursVal);
			}
			
			function writeClassAttr(data) {
				if(undefined === data) {
					return "";
				}
				if(undefined !== settings[data]) {
					data = settings[data];
				}
				if(data instanceof Array) {
					return $.map(data, function(s) {return String(s);}).join(" ");
				}
				return String(data);
			}
			
			function hookEvents(minutesInput, minutesVal, minutesSlider, minutesLabel, hoursVal, hoursSlider, hoursLabel) {
				minutesSlider.on("input", function() {
					minutesVal.text(minutesSlider.val());
					updateInputFromSliders(minutesInput, minutesSlider, hoursSlider);
					doOnChange(minutesInput, minutesSlider, hoursSlider)
				})
				
				hoursSlider.on("input", function() {
					hoursVal.text(hoursSlider.val());
					updateInputFromSliders(minutesInput, minutesSlider, hoursSlider);
					doOnChange(minutesInput, minutesSlider, hoursSlider);
				})
				minutesInput.change(function() {
					updateSlidersFromInput(minutesInput, minutesSlider, hoursSlider, minutesVal, hoursVal);
					doOnChange(minutesInput, minutesSlider, hoursSlider);
				})
			}
			
			
			var settings = $.extend({
				"debug": false,
				"widgetClass": "minuteSlidersWidget",
				"minutesContainerClass": ["minutesContainer", "form-group"],
				"hoursContainerClass": ["hoursContainer", "form-group"],
				"hoursLabel": "hours",
				"minutesLabel": "minutes",
				"labelClass": "control-label",
				"sliderClass": "form-control",
				"hoursValueClass": "hoursValue",
				"minutesValueClass": "minutesValue",
				"onChange": function (o) {
					if(true === settings.debug) {
						console.log(o);
					}
				}
			}, options );

			return this.each(function() {
				var minutesInput = $(this);
				var elId = minutesInput.prop("id");
				var elName = minutesInput.prop("name");
				
				var minutesSlider = $('<input id="minutes_' + elName + '" type="range" min="0" max="59" value="0" class="'+writeClassAttr("sliderClass")+'"/>');
				var minutesLabel = $('<label class="'+writeClassAttr("labelClass")+'" for="minutes_' + elName + '">' + settings.minutesLabel + '</label>');
				var minutesVal = $('<span id="minutesVal_' + elName + '" class="'+writeClassAttr("minutesValueClass")+'">0</span>');
				
				var hoursSlider = $('<input id="hours_' + elName + '" type="range" min="0" max="24" value="0" class="'+writeClassAttr("sliderClass")+'"/>');
				var hoursLabel = $('<label class="'+writeClassAttr("labelClass")+'" for="hours_' + elName + '">' + settings.hoursLabel + '</label>');
				var hoursVal = $('<span id="hoursVal_' + elName + '" class="'+writeClassAttr("hoursValueClass")+'">0</span>');
								
				buildTheDOM(minutesInput, minutesVal, minutesSlider, minutesLabel, hoursVal, hoursSlider, hoursLabel);
				
				hookEvents(minutesInput, minutesVal, minutesSlider, minutesLabel, hoursVal, hoursSlider, hoursLabel)
			});
		}

	}(jQuery));	