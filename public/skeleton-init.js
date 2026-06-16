(function() {
  document.documentElement.classList.remove('dark');
  
  var savedMode = 'bed';
  var savedTime = null;
  var savedWake = '07:00';
  var savedAge = '18-25';
  
  try {
    savedMode = localStorage.getItem('aurasleep_mode') || 'bed';
    savedTime = localStorage.getItem('aurasleep_time');
    savedWake = localStorage.getItem('aurasleep_waketime') || '07:00';
    savedAge = localStorage.getItem('aurasleep_age') || '18-25';
  } catch (storageError) {
    console.warn('LocalStorage is blocked or unsupported', storageError);
  }
  
  if (!['wake', 'bed', 'cycles', 'nap', 'rem'].includes(savedMode)) {
    savedMode = 'bed';
  }
  
  var resolvedTime = '';
  if (savedTime && /^\d{2}:\d{2}$/.test(savedTime)) {
    resolvedTime = savedTime;
  } else {
    var now = new Date();
    var ms = 1000 * 60 * 15;
    var roundedDate = new Date(Math.round(now.getTime() / ms) * ms);
    var hours = String(roundedDate.getHours()).padStart(2, '0');
    var mins = String(roundedDate.getMinutes()).padStart(2, '0');
    resolvedTime = hours + ':' + mins;
  }
  
  var ageGroups = {
    '0-3m': '0-3 Months',
    '4-11m': '4-11 Months',
    '1-2y': '1-2 Years',
    '3-5y': '3-5 Years',
    '6-12y': '6-12 Years',
    '13-17': '13-17 Years',
    '18-25': '18-25 Years',
    '26-40': '26-40 Years',
    '41-64': '41-64 Years',
    '65+': '65+ Years'
  };
  var ageLabel = ageGroups[savedAge] || '18-25 Years';

  function formatTimeParts(timeStr) {
    var parts = timeStr.split(':');
    var h = parseInt(parts[0], 10);
    var m = parts[1] || '00';
    var period = h >= 12 ? 'PM' : 'AM';
    var displayH = h % 12 === 0 ? 12 : h % 12;
    return {
      hours: String(displayH).padStart(2, '0'),
      minutes: m,
      period: period
    };
  }

  window.__initSkeleton = function() {
    try {
      var tabsContainer = document.getElementById('sk-tabs-container');
      var inputFormContainer = document.getElementById('sk-inputs-container');
      var ageGroupContainer = document.getElementById('sk-age-container');
      var calcBtn = document.getElementById('sk-calc-btn');
      
      if (!tabsContainer || !inputFormContainer) return;
      
      var tabs = tabsContainer.children;
      var tabIdMap = ['wake', 'bed', 'cycles', 'nap', 'rem'];
      for (var i = 0; i < tabs.length; i++) {
        var tMode = tabIdMap[i];
        if (tMode === savedMode) {
          tabs[i].className = 'sk-tab sk-tab-active';
        } else {
          tabs[i].className = 'sk-tab';
        }
      }
      
      var innerHTML = '';
      if (savedMode === 'cycles') {
        var pt1 = formatTimeParts(resolvedTime);
        var pt2 = formatTimeParts(savedWake);
        innerHTML = 
          '<div class="sk-input-group">' +
            '<span class="sk-small-label">1. Planned Bedtime</span>' +
            '<div class="sk-picker">' +
              '<svg class="sk-clock-icon" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" width="26" height="26">' +
                '<circle cx="12" cy="12" r="10"></circle>' +
                '<polyline points="12 6 12 12 16 14"></polyline>' +
              '</svg>' +
              '<div class="sk-time-display">' +
                '<span class="sk-time-text">' + pt1.hours + ':' + pt1.minutes + '</span>' +
                '<span class="sk-period-text">' + pt1.period + '</span>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="sk-input-group">' +
            '<span class="sk-small-label">2. Planned Wake-up Time</span>' +
            '<div class="sk-picker">' +
              '<svg class="sk-clock-icon" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" width="26" height="26">' +
                '<circle cx="12" cy="12" r="10"></circle>' +
                '<polyline points="12 6 12 12 16 14"></polyline>' +
              '</svg>' +
              '<div class="sk-time-display">' +
                '<span class="sk-time-text">' + pt2.hours + ':' + pt2.minutes + '</span>' +
                '<span class="sk-period-text">' + pt2.period + '</span>' +
              '</div>' +
            '</div>' +
          '</div>';
      } else {
        var pTime = formatTimeParts(resolvedTime);
        innerHTML = 
          '<div class="sk-input-group">' +
            '<div class="sk-picker">' +
              '<svg class="sk-clock-icon" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" width="26" height="26">' +
                '<circle cx="12" cy="12" r="10"></circle>' +
                '<polyline points="12 6 12 12 16 14"></polyline>' +
              '</svg>' +
              '<div class="sk-time-display">' +
                '<span class="sk-time-text">' + pTime.hours + ':' + pTime.minutes + '</span>' +
                '<span class="sk-period-text">' + pTime.period + '</span>' +
              '</div>' +
            '</div>' +
          '</div>';
      }
      inputFormContainer.innerHTML = innerHTML;
      
      if (savedMode !== 'nap' && savedMode !== 'cycles' && savedMode !== 'rem') {
        ageGroupContainer.style.display = 'flex';
        var ageValEl = document.getElementById('sk-age-val');
        if (ageValEl) ageValEl.textContent = ageLabel;
      } else {
        ageGroupContainer.style.display = 'none';
      }
      
      var btnText = 'Calculate Bed Time';
      if (savedMode === 'wake') btnText = 'Calculate Wake Up Time';
      else if (savedMode === 'cycles') btnText = 'Calculate Sleep Cycles';
      else if (savedMode === 'nap') btnText = 'Calculate Nap Time';
      else if (savedMode === 'rem') btnText = 'Calculate REM Sleep';
      
      if (calcBtn) calcBtn.textContent = btnText;
    } catch (err) {
      console.warn('Skeleton config failed', err);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.__initSkeleton);
  } else {
    window.__initSkeleton();
  }
})();
