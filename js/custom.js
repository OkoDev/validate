
(function() {

	// Before using it we must add the parse and format functions
	// Here is a sample implementation using moment.js
	validate.extend(validate.validators.datetime, {
		// The value is guaranteed not to be null or undefined but otherwise it
		// could be anything.
		parse: function(value, options) {
			return +moment.utc(value);
		},
		// Input is a unix timestamp
		format: function(value, options) {
			var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
			return moment.utc(value).format(format);
		}
	});

	var constraints = {
		login: {
			presence: {message: "^Логин должен быть введен."},
			length: {
				minimum: 8,
				maximum: 30,
				tooShort: "^Не менее %{count} символов.",
				tooLong: "^Не более %{count} символов."
			},
			format: {
				pattern: "[a-z0-9_\-]+",
				flags: "i",
				message: "^Логин из латинских букв, цифр _ - ."
			}
		},
		//......................................................
		password: {
			presence: {message: "^Пароль должен быть введен."},
			length: {
				minimum: 8,
				maximum: 30,
				tooShort: "^Не менее %{count} символов.",
				tooLong: "^Не более %{count} символов."
			},
			format: {
				pattern: ".*([a-z]+[A-Z]+[0-9]+|[a-z]+[0-9]+[A-Z]+|[A-Z]+[a-z]+[0-9]+|[A-Z]+[0-9]+[a-z]+|[0-9]+[a-z]+[A-Z]+|[0-9]+[A-Z]+[a-z]+).*",
				message: "^Строчная, заглавная и цифра."
			}

		},
		"password-confirm": {
			presence: {message: "^Подтверждение пароля должно быть введено."},
			equality: {
				attribute: "password",
				message: "^Пароли не совпадают"
			}
		},
		//......................................................
		name: {
			presence: {message: "^Имя должно быть введено."},
			length: {
				maximum: 30,
				tooLong: "^Не более %{count} символов."
			},
			format: {
				pattern: "[a-zа-яё0-9]+",
				flags: "i",
				message: "^Только буквы и цифры."
			}
		},
		surname: {
			presence: {message: "^Фамилия должна быть введена."},
			length: {
				maximum: 30,
				tooLong: "^Не более %{count} символов."
			},
			format: {
				pattern: "[a-zа-яё0-9]+",
				flags: "i",
				message: "^Только буквы и цифры."
			}
		},
		fathername: {
			presence: false,
			length: {
				maximum: 30,
				tooLong: "^Не более %{count} символов."
			},
			format: {
				pattern: "[a-zа-яё0-9]+",
				flags: "i",
				message: "^Только буквы и цифры."
			}
		},
		birthdate: {
			presence: {message: "^Дата должна быть введена."},
			date: {
				earliest: moment.utc().subtract(120, 'years'),
				latest: moment.utc().subtract(18, 'years'),
				message: "^Вам должно быть больше 18 лет и меньше 120."
			}
		},
		eventdate: {
			presence: {message: "^Дата должна быть введена."},
			date: {
				earliest: moment.utc().subtract(100, 'years'),
				latest: moment.utc(),
				message: "^Введенная дата еще не наступила или была более 100 лет назад."
			}
		},
		email: {
			presence: {message: " должен быть введен."},
			format: {
				pattern: "^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$",
				flags: "i",
				message: "^E-mail в формате name@site.all."
			},
			email: {
				message: "Не корректный E-mail."
			}
		},
		phone: {
			presence: {message: "^Телефон должен быть введен."},
			format: {
				pattern: "(?:8|\\+7)? ?\\(?(\\d{3})\\)? ?(\\d{3})[ -]?(\\d{2})[ -]?(\\d{2})",
				flags: "i",
				message: "^Телефон в формате +7 (123) 456-78-90."
			}
		},
		event: {
			presence: {message: "^Мероприятие должно быть введено."},
			length: {
				maximum: 30,
				tooLong: "^Не более %{count} символов."
			},
			format: {
				pattern: "^[a-zа-яё 0-9,!?;:'\.\"\-]+$",
				flags: "i",
				message: "^Буквы, цифры и знаки препинания."
			}
		},
		place: {
			presence: {message: "^Место должно быть введено."},
			length: {
				maximum: 30,
				tooLong: "^Не более %{count} символов."
			},
			format: {
				pattern: "^[a-zа-яё 0-9,!?;:'\.\"\-]+$",
				flags: "i",
				message: "^Буквы, цифры и знаки препинания."
			}
		},
		rev: {
			presence: false,
			length: {
				maximum: 255,
				tooLong: "^Не более %{count} символов."
			},
		},
	};


	// Hook up the form so we can prevent it from being posted
	var form = document.querySelector("form");
	form.addEventListener("submit", function(ev) {
		ev.preventDefault();
		handleFormSubmit(form);
	});


	// Hook up the inputs to validate on the fly
	var inputs = document.querySelectorAll("input, textarea, select")
	for (var i = 0; i < inputs.length; ++i) {
		inputs.item(i).addEventListener("change", function(ev) {
			var errors = validate(form, constraints) || {};
			showErrorsForInput(this, errors[this.name])
		});
	}

	function handleFormSubmit(form, input) {
		// validate the form aainst the constraints
		var errors = validate(form, constraints);
		// then we update the form to reflect the results
		showErrors(form, errors || {});
		if (!errors) {
			$('form').submit();
		}
	}

	// Updates the inputs with the validation errors
	function showErrors(form, errors) {
		// We loop through all the inputs and show the errors for that input
		_.each(form.querySelectorAll("input[name], select[name]"), function(input) {
			// Since the errors can be null if no errors were found we need to handle
			// that
			showErrorsForInput(input, errors && errors[input.name]);
		});
	}

	// Shows the errors for a specific input
	function showErrorsForInput(input, errors) {
		// This is the root of the input
		var formGroup = closestParent(input.parentNode, "form-group")
			// Find where the error messages will be insert into
			, messages = formGroup.querySelector(".messages");
		// First we remove any old messages and resets the classes
		resetFormGroup(formGroup);
		// If we have errors
		if (errors) {
			// we first mark the group has having errors
			formGroup.classList.add("has-error");
			// then we append all the errors
			_.each(errors, function(error) {
				addError(messages, error);
			});
		} else {
			// otherwise we simply mark it as success
			formGroup.classList.add("has-success");
		}
	}

	// Recusively finds the closest parent that has the specified class
	function closestParent(child, className) {
		if (!child || child == document) {
			return null;
		}
		if (child.classList.contains(className)) {
			return child;
		} else {
			return closestParent(child.parentNode, className);
		}
	}

	function resetFormGroup(formGroup) {
		// Remove the success and error classes
		formGroup.classList.remove("has-error");
		formGroup.classList.remove("has-success");
		// and remove any old messages
		_.each(formGroup.querySelectorAll(".help-block.error"), function(el) {
			el.parentNode.removeChild(el);
		});
	}

	// Adds the specified error with the following markup
	function addError(messages, error) {
		var block = document.createElement("p");
		block.classList.add("help-block");
		block.classList.add("error");
		block.innerText = error;
		messages.appendChild(block);
	}

	// Mask
	$('#phone').mask('+0 (000) 000-00-00');

	// Animate background
	setInterval(function(){
		var r = Math.floor(Math.random() * 2.5 * 100);
		var g = Math.floor(Math.random() * 2.5 * 100);
		var b = Math.floor(Math.random() * 2.5 * 100);

		$('body')[0].style.backgroundColor = "rgba(" + r + "," + g + "," + b + ", .078)";
	}, 10000);

//	//Scroll indicators
//	function scrollIndicators(){
//		document.addEventListener("scroll", function(ev){
//			if(window.scrollY > document.body.clientHeight - window.innerHeight - 20){
//				$('.indicators')[0].style.bottom = '18px';
//			}else{
//				$('.indicators')[0].style.bottom = '55%';
//			}
//		});
//	}

	//hook scroll
	window.onload = function() {
		if($('.indicators')[0] != undefined){
			scrollIndicators();
		}
	}



})();




