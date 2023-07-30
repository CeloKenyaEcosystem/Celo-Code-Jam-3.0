export const truncate = (address: string) => {
  const startLength = 6
  const endLength = 4
  
   if (!address) {
    return '';
  }

  const prefix = address.substring(0, startLength);
  const suffix = address.substring(address.length - endLength);

  return `${prefix}...${suffix}`;
}

 export const formattedDate = (timestamp : number) => {
    const date = new Date(timestamp * 1000);
    const options: any = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const readableDate = date.toLocaleString(undefined, options);
    return readableDate
  }