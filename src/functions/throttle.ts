// initialize throttlePause variable outside throttle function
let throttlePause: boolean;

export default (callback: any, time: number) => {
	// don't run the function if throttlePause is true
	if (throttlePause) return;
	if (!callback) return;

	// set throttlePause to true after the if condition. This allows the function to be run once
	throttlePause = true;

	// setTimeout runs the callback within the specified time
	setTimeout(() => {
		callback();

		// throttlePause is set to false once the function has been called, allowing the throttle function to loop
		throttlePause = false;
	}, time);
};
