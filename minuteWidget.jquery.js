(function($, undefined){				
			$.fn.minuteWidget = function( options ) {
			
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
			
			
			var settings = $.extend({}, options );

			return this.each(function() {
				var minutesInput = $(this);
				var elId = minutesInput.prop("id");
				var elName = minutesInput.prop("name");
				
				var minutesSlider = $('<input id="minutes_' + elName + '" type="range" min="0" max="59" value="0"/>');
				var minutesLabel = $('<label class="control-label" for="minutes_' + elName + '">דקות</label>');
				var minutesVal = $('<span id="minutesVal_' + elName + '">0</span>');
				
				var hoursSlider = $('<input id="hours_' + elName + '" type="range" min="0" max="24" value="0"/>');
				var hoursLabel = $('<label class="control-label" for="hours_' + elName + '">שעות</label>');
				var hoursVal = $('<span id="hoursVal_' + elName + '">0</span>');
				
				
				
				minutesInput.hide();
				var widget = $("<div class='minuteSlidersWidget'></div>");
				var minutesContainer = $("<div class='minutesContainer'></div>");
				var hoursContainer = $("<div class='hoursContainer'></div>");
				minutesContainer.append(minutesVal);
				minutesContainer.append(minutesSlider);
				minutesContainer.append(minutesLabel);
				hoursContainer.append(hoursVal);
				hoursContainer.append(hoursSlider);
				hoursContainer.append(hoursLabel);
				widget.append(minutesContainer);
				widget.append(hoursContainer);
				minutesInput.after(widget);
				updateSlidersFromInput(minutesInput, minutesSlider, hoursSlider, minutesVal, hoursVal);
				
				minutesSlider.on("input", function() {
					minutesVal.text(minutesSlider.val());
					updateInputFromSliders(minutesInput, minutesSlider, hoursSlider);
				})
				
				hoursSlider.on("input", function() {
					hoursVal.text(hoursSlider.val());
					updateInputFromSliders(minutesInput, minutesSlider, hoursSlider);
				})
				minutesInput.change(function() {
					updateSlidersFromInput(minutesInput, minutesSlider, hoursSlider, minutesVal, hoursVal);
				})
			});
		}

	}(jQuery));	