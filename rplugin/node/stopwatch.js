"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stopwatch = exports.getSeconds = exports.Stopwatch = void 0;
class Stopwatch {
    /**
     * Creates a new Stopwatch instance.
     * The unit of all durations reported by this instance will match the
     * unit of time returned by the provided `getSystemTime` param.
     *
     * @param getSystemTime - A callback that returns the current system time.
     *        Defaults to the current default system time getter as specified by the most
     *        recent call to {@link Stopwatch.setDefaultSystemTimeGetter}, which in turn
     *        defaults to {@link Date.now}.
     */
    constructor(getSystemTime = defaultSystemTimeGetter) {
        this.getSystemTime = getSystemTime;
        /**
         * The total amount of system time the stopwatch has been stopped since
         * the last reset.
         */
        this.stopDuration = 0;
        /**
         * Recorded results of all completed slices since the the last reset.
         */
        this.completedSlices = [];
    }
    /**
     * Get the current state of this stopwatch.
     *
     * @return the current state of this stopwatch.
     */
    getState() {
        if (this.startSystemTime === undefined) {
            return Stopwatch.State.IDLE;
        }
        else if (this.stopSystemTime === undefined) {
            return Stopwatch.State.RUNNING;
        }
        else {
            return Stopwatch.State.STOPPED;
        }
    }
    /**
     * Test if this stopwatch is currently {@link Stopwatch.State#IDLE}.
     *
     * @return true if this stopwatch is currently {@link Stopwatch.State#IDLE}.
     */
    isIdle() {
        return this.getState() === Stopwatch.State.IDLE;
    }
    /**
     * Test if this stopwatch is currently {@link Stopwatch.State#RUNNING}.
     *
     * @return true if this stopwatch is currently {@link Stopwatch.State#RUNNING}.
     */
    isRunning() {
        return this.getState() === Stopwatch.State.RUNNING;
    }
    /**
     * Test if this stopwatch is currently {@link Stopwatch.State#STOPPED}.
     *
     * @return true if this stopwatch is currently {@link Stopwatch.State#STOPPED}.
     */
    isStopped() {
        return this.getState() === Stopwatch.State.STOPPED;
    }
    /**
     * Get the current stopwatch time.
     * This is the total amount of system time that this stopwatch has been running since
     * the last reset.
     *
     * Returns zero if the state is currently {@link Stopwatch.State#IDLE}.
     *
     * @return the current stopwatch time.
     */
    getTime() {
        return this.calculateStopwatchTime();
    }
    /**
     * Get details about the current pending slice for this stopwatch, as of now.
     *
     * Returns a zero-length slice if the state is currently {@link Stopwatch.State#IDLE}.
     *
     * @return details about the current pending slice for this stopwatch, as of now.
     */
    getPendingSlice() {
        return this.calculatePendingSlice();
    }
    /**
     * Get a list of all completed/recorded slices for this stopwatch since the last reset.
     * @return a list of all completed/recorded slices for this stopwatch since the last reset.
     */
    getCompletedSlices() {
        return Array.from(this.completedSlices);
    }
    /**
     * Get a list of all completed/recorded slices for this stopwatch since the last reset,
     * plus the current pending slice.
     * @return a list of all completed/recorded slices for this stopwatch since the last reset,
     * plus the current pending slice.
     */
    getCompletedAndPendingSlices() {
        return [...this.completedSlices, this.getPendingSlice()];
    }
    /**
     * Starts (or resumes) running this stopwatch.
     *
     * Does nothing if the state is already {@link Stopwatch.State#RUNNING} and `forceReset`
     * is false.
     *
     * The state is guaranteed to be {@link Stopwatch.State#RUNNING} after
     * calling this method.
     *
     * @param forceReset - If true, then the stopwatch is {@link #reset} before starting.
     */
    start(forceReset = false) {
        if (forceReset) {
            this.reset();
        }
        if (this.stopSystemTime !== undefined) {
            const systemNow = this.getSystemTime();
            const stopDuration = systemNow - this.stopSystemTime;
            // Accumulate duration ot stop
            this.stopDuration += stopDuration;
            // Resume running
            this.stopSystemTime = undefined;
        }
        else if (this.startSystemTime === undefined) {
            const systemNow = this.getSystemTime();
            // Record initial start time
            this.startSystemTime = systemNow;
            this.pendingSliceStartStopwatchTime = 0;
        }
    }
    /**
     * Ends the currently pending slice {@link Stopwatch.Slice}, records it, and
     * starts the next pending slice.
     *
     * Does nothing and returns a zero-length slice if the state is
     * currently {@link Stopwatch.State#IDLE}.
     *
     * If the state is currently {@link Stopwatch.State#STOPPED}, then the slice
     * technically ends (and the next pending slice starts) at the same time
     * the stopwatch was stopped.
     *
     * This method does not change the state of the stopwatch.
     *
     * @returns the recorded slice.
     */
    slice() {
        return this.recordPendingSlice();
    }
    /**
     * Stops (pauses) this stopwatch and returns the current {@link #getTime}
     * result. Time will not be accumulated to this stopwatch's total running duration
     * or the current pending slice while it is stopped. Call {@link #start} to resume
     * accumulating time.
     *
     * Does nothing and returns zero if the state is currently {@link Stopwatch.State#IDLE}.
     *
     * Stopping a stopwatch that is already {@link Stopwatch.State#STOPPED} will still
     * record another slice if `recordPendingSlice` is true.
     *
     * The state will be {@link Stopwatch.State#STOPPED} after calling this method if
     * the state is not currently {@link Stopwatch.State#IDLE}. otherwise, it will remain
     * {@link Stopwatch.State#IDLE}.
     *
     * @param recordPendingSlice - If true, then also end/record the current pending slice.
     *        This ensures that slice is ended exactly at the same time that the stopwatch
     *        is stopped.
     * @return the current {@link #getTime} result.
     */
    stop(recordPendingSlice = false) {
        if (this.startSystemTime === undefined) {
            return 0;
        }
        const systemTimeOfStopwatchTime = this.getSystemTimeOfCurrentStopwatchTime();
        if (recordPendingSlice) {
            this.recordPendingSlice(this.calculateStopwatchTime(systemTimeOfStopwatchTime));
        }
        this.stopSystemTime = systemTimeOfStopwatchTime;
        return this.getTime();
    }
    /**
     * Completely resets this stopwatch to its initial state.
     * Clears out all recorded running duration, slices, etc.
     * The state is guaranteed to be {@link Stopwatch.State#IDLE} after
     * calling this method.
     */
    reset() {
        this.startSystemTime =
            this.pendingSliceStartStopwatchTime =
                this.stopSystemTime =
                    undefined;
        this.stopDuration = 0;
        this.completedSlices = [];
    }
    /**
     * Gets the system time equivalent of the current stopwatch time.
     * If this stopwatch is currently stopped, then the system time at which it was
     * stopped is returned.
     * Otherwise, the current system time according to {@link Stopwatch#getSystemTime} is
     * returned.
     * @return the system time equivalent of the current stopwatch time.
     */
    getSystemTimeOfCurrentStopwatchTime() {
        return this.stopSystemTime === undefined
            ? this.getSystemTime()
            : this.stopSystemTime;
    }
    /**
     * Calculates the current stopwatch time as of a specified system time.
     * @param endSystemTime - The end system time for the calculation.
     * @return the current stopwatch time as of the specified system time.
     */
    calculateStopwatchTime(endSystemTime) {
        if (this.startSystemTime === undefined) {
            return 0;
        }
        if (endSystemTime === undefined) {
            endSystemTime = this.getSystemTimeOfCurrentStopwatchTime();
        }
        return endSystemTime - this.startSystemTime - this.stopDuration;
    }
    /**
     * Calculates the current pending slice as of a specified stopwatch time.
     * @param endStopwatchTime - The end stopwatch time for the calculation.
     * @return the current pending slice as of the specified stopwatch time.
     */
    calculatePendingSlice(endStopwatchTime) {
        if (this.pendingSliceStartStopwatchTime === undefined) {
            return Object.freeze({
                startTime: 0,
                endTime: 0,
                duration: 0,
            });
        }
        if (endStopwatchTime === undefined) {
            endStopwatchTime = this.getTime();
        }
        return Object.freeze({
            startTime: this.pendingSliceStartStopwatchTime,
            endTime: endStopwatchTime,
            duration: endStopwatchTime - this.pendingSliceStartStopwatchTime,
        });
    }
    /**
     * Private implementation of ending/recording the currently pending slice.
     * See {@link #slice} for more explanation.
     * @param endStopwatchTime - The end stopwatch time of the slice.
     * @return the recorded slice.
     */
    recordPendingSlice(endStopwatchTime) {
        if (this.pendingSliceStartStopwatchTime !== undefined) {
            if (endStopwatchTime === undefined) {
                endStopwatchTime = this.getTime();
            }
            const slice = this.calculatePendingSlice(endStopwatchTime);
            // Start the next pending slice
            this.pendingSliceStartStopwatchTime = slice.endTime;
            // Record the slice
            this.completedSlices.push(slice);
            return slice;
        }
        else {
            return this.calculatePendingSlice();
        }
    }
}
exports.Stopwatch = Stopwatch;
(function (Stopwatch) {
    /**
     * Possible states of a {@link Stopwatch}.
     */
    let State;
    (function (State) {
        /**
         * The stopwatch has not yet been started, or has been reset.
         */
        State["IDLE"] = "IDLE";
        /**
         * The stopwatch is currently running.
         */
        State["RUNNING"] = "RUNNING";
        /**
         * The stopwatch was previously running, but has been stopped.
         */
        State["STOPPED"] = "STOPPED";
    })(State = Stopwatch.State || (Stopwatch.State = {}));
    /**
     * Sets the default implementation of "getSystemTime" to be used by all future
     * instances of {@link Stopwatch}.
     * @param systemTimeGetter - A default "getSystemTime" implementation for
     *        all future instances of {@link Stopwatch}.
     *        Defaults to {@link Date.now}.
     */
    function setDefaultSystemTimeGetter(systemTimeGetter = Date.now) {
        defaultSystemTimeGetter = systemTimeGetter;
    }
    Stopwatch.setDefaultSystemTimeGetter = setDefaultSystemTimeGetter;
})(Stopwatch = exports.Stopwatch || (exports.Stopwatch = {}));
const getSeconds = () => {
    return Math.round(exports.stopwatch.getTime() / 1000);
};
exports.getSeconds = getSeconds;
let defaultSystemTimeGetter = Date.now;
exports.stopwatch = new Stopwatch();
//# sourceMappingURL=stopwatch.js.map