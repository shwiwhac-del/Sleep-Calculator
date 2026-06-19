/**
 * Sleep Calculator - Fallback Math calculations
 * Consistently estimates optimal 90-minute cycle blocks
 */

function calculateOptimalBedtimes(wakeUpTimeStr, latencyMinutes = 15) {
  const wakeUpParts = wakeUpTimeStr.split(":");
  let hours = parseInt(wakeUpParts[0]);
  let minutes = parseInt(wakeUpParts[1]);

  const wakeDate = new Date();
  wakeDate.setHours(hours, minutes, 0, 0);

  const bedtimes = [];
  // Calculate backwards for 6, 5, 4 and 3 cycles (each cycle is 90 minutes)
  const cycles = [6, 5, 4, 3];
  
  cycles.forEach(cycleCount => {
    const totalMinutes = (cycleCount * 90) + latencyMinutes;
    const bedtime = new Date(wakeDate.getTime() - (totalMinutes * 60 * 1000));
    bedtimes.push(bedtime);
  });

  return bedtimes;
}
