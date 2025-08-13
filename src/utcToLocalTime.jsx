export function utcIntToLocalTime(UTCTime){
    if(typeof UTCTime !== 'number' || !Number.isFinite(UTCTime)){
      throw new Error("Invalid UTC timestamp");
    }

    const podatkiCasUTC = new Date(UTCTime * 1000);
    const formatter = new Intl.DateTimeFormat('en-GB', {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        hour: '2-digit',
        minute: '2-digit',
    });
    const podatkiCasString = formatter.format(podatkiCasUTC);
    return podatkiCasString;
}

export function utcStrToLocalTime(UTCTime){
    if(typeof UTCTime !== 'string' || UTCTime.trim() === ''){
      throw new Error("Invalid UTC string");
    }

    const isoString = UTCTime.trim().replace(' ', 'T');
    
    const podatkiCasUTC = new Date(isoString);

    if (isNaN(podatkiCasUTC.getTime())) {
        throw new Error("Invalid date format");
    }

    const formatter = new Intl.DateTimeFormat('sl-SI', {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        day: 'numeric',
        month: 'numeric',
        hour: 'numeric',
        hour12: false
    });
    const podatkiCasString = formatter.format(podatkiCasUTC);
    return podatkiCasString;
}