var app = (function() {
	function puls(a, b) {
		return a + b;
	}

	function minus(a, b) {
		return a - b;
	}

	function subtract(a, b) {
		return a * b;
	}

	function devide(a, b) {
		return a / b;
	}
	var array = [puls, minus, subtract, devide];
	var orders = [];
	for (o1 = 0; o1 < 4; o1++) {
		for (o2 = 0; o2 < 4; o2++) {
			if (o1 === o2) continue;
			for (o3 = 0; o3 < 4; o3++) {
				if (o1 === o3 || o2 === o3) continue;
				for (o4 = 0; o4 < 4; o4++) {
					if (o1 === o4 || o2 === o4 || o3 === o4) continue;
					var isSame = false;
					for (o in orders) {
						if (orders[o][0] === o1 && orders[o][1] === o2 && orders[o][2] === o3 && orders[o][3] === o4) {
							isSame = true;
							break;
						}
					}
					if (isSame) continue;
					orders.push([o1, o2, o3, o4]);
				}
			}
		}
	}

	function replaceC(n) {
		switch (n) {
			case 0:
				return "+";
			case 1:
				return "-";
			case 2:
				return "*";
			case 3:
				return "/";
		}
	}

	function calc(a, b, c, d) {
		var nums = [a, b, c, d];

		var seq = [];
		var result = [];
		for (var x = 0; x < orders.length; x++) {
			for (var i = 0; i < array.length; i++) {
				for (var j = 0; j < array.length; j++) {
					for (var k = 0; k < array.length; k++) {
						try {
							if (array[k](array[j](array[i](nums[orders[x][0]], nums[orders[x][1]]), nums[orders[x][2]]), nums[orders[x][3]]) === 24) {
								var isSame = false;
								for (s in seq) {
									if (nums[orders[x][0]] === seq[s].n1 && nums[orders[x][1]] === seq[s].n2 && nums[orders[x][2]] === seq[s].n3 && nums[orders[x][3]] === seq[s].n4 && i === seq[s].i && j === seq[s].j && k === seq[s].k) {
										isSame = true;
										break;
									}
								}
								if (isSame)
									continue;
								seq.push({
									n1: nums[orders[x][0]],
									n2: nums[orders[x][1]],
									n3: nums[orders[x][2]],
									n4: nums[orders[x][3]],
									i: i,
									j: j,
									k: k
								});
								result.push("((" + nums[orders[x][0]] + " " + replaceC(i) + " " + nums[orders[x][1]] + ") " + replaceC(j) + " " + nums[orders[x][2]] + ") " + replaceC(k) + " " + nums[orders[x][3]]);
							}
						} catch (e) {}
					}
				}
			}
		}
		return result;
	}

	return {
		calc: calc
	}
})();