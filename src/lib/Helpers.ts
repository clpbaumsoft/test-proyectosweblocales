import moment from "moment-timezone";
import type { Moment } from "moment";

export const TZ = 'America/Bogota'

export const mInit = (val: string | Date | number | number[] | Moment) => moment.tz(val, TZ)

export const now = () => moment.tz(TZ)

export const formatsDate = (strDate: string | Moment, displayFormat = 'D MMMM, YYYY - h:mm a') => {
  if(!moment.isMoment(strDate)) {
    strDate = moment(strDate)
  }
  return strDate.format(displayFormat)
}

export const mediaUrl = (mediaId: number, slug: string) => {
  return `/archivos/{id}/{slug}`.replace('{id}', String(mediaId)).replace('{slug}', slug)
}

export const setCookie = (cname: string, cvalue: string, exdays = 1) => {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  const expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export const getCookie = (cname: string) => {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export const removeCookie = (cname: string) => {
  document.cookie=`${cname}=de;expires=Wed, 18 Dec 2019 12:00:00 GMT;`
}

export const formatFileSize = (sizeInBytes: number) => {
  if (sizeInBytes < 1024) {
    return sizeInBytes + " B"; // Bytes
  } else if (sizeInBytes < 1024 * 1024) {
    return (sizeInBytes / 1024).toFixed(2) + " KB"; // Kilobytes
  } else if (sizeInBytes < 1024 * 1024 * 1024) {
    return (sizeInBytes / (1024 * 1024)).toFixed(2) + " MB"; // Megabytes
  } else {
    return (sizeInBytes / (1024 * 1024 * 1024)).toFixed(2) + " GB"; // Gigabytes
  }
}

export const dataURLtoFile = (dataUrl: string, fileName: string, defaultMime = 'image/png'): File => {
  const arr = dataUrl.split(',');
  const mimeMatch = arr[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : defaultMime;
  const bstr = atob(arr[1]); // decode base64
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], fileName, { type: mime });
}


export const getLanguage = (defaultLang = 'es') => {
  const path = typeof(window) !== 'undefined' && (window?.location?.pathname) ? window.location.pathname.split("/") : []
  let lang = defaultLang
  let instance = null
  const regexp = /^([a-z]{2})-([a-z]{2})$/
  if (path.length >= 2) {
    path.shift() // removes the first value which is an empty string
    const firstPart = path.shift() // gets the first part of the path, which is supposed to be "es-la", for example
    if (firstPart && regexp.test(firstPart)) {
      const matches = firstPart.match(regexp)
      if(matches) {
        lang = matches[1]
        instance = matches[2]
      }
    }
  }
  return {
    lang,
    instance,
  }
}

export const isBetweenDates = (start: string | Moment, end: string | Moment, checkDate: string | Moment) => {
  if(!start || !end) {
    return false
  }
  if(!moment.isMoment(start)) {
    start = mInit(start)
  }
  if(!moment.isMoment(end)) {
    end = mInit(end)
  }
  if(!moment.isMoment(checkDate)) {
    checkDate = mInit(checkDate)
  }
  return checkDate.isBetween(start, end, undefined, '[]')
}


export const waiting = (seconds = 5) => {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000)
  })
}

export function getTimeDiff(dateString: string): string {
    const date = new Date(dateString.replace(' ', 'T'));
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    let interval = seconds / 31536000; // years
    if (interval > 1) {
        return Math.floor(interval) + " años";
    }
    interval = seconds / 2592000; // months
    if (interval > 1) {
        return Math.floor(interval) + " meses";
    }
    interval = seconds / 86400; // days
    if (interval > 1) {
      const days = Math.floor(interval);
        return days + days > 1 ? " días" : " día";
    }
    interval = seconds / 3600; // hours
    if (interval > 1) {
        const hours = Math.floor(interval);
        return hours + `${hours < 1 ? " horas" : " hora"}`;
    }
    interval = seconds / 60; // minutes
    if (interval > 1) {
        const minutes = Math.floor(interval);
        return minutes + `${minutes < 1 ? " minuto" : " minutos"}`;
    }
    return Math.floor(seconds) + " segundos";
}