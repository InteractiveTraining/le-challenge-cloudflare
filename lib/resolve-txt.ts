import * as util from 'util';
import * as dns from 'dns';
// import * as resolveRecord from 'dns-over-https';

const dnsResolveTxt = util.promisify(dns.resolveTxt);

/**
 * Returns an array of all TXT records for the specified domain.
 * @param {string} fqdn - The domain to lookup.
 * @param {boolean} useDNSOverHTTPS - If `true` use the Gooogle Public DNS API
 *  (DNS-Over-HTTPS) instead of the native DNS module. Usefule when you're
 *  sitting behind an HTTP/S proxy.
 * @return {string[]} - The TXT records for the specified domain.
 * @throws {Error} throw when the lookup fails.
 * @private
 */
export async function resolveTxt(fqdn, useDNSOverHTTPS = false) {
  // if (useDNSOverHTTPS) {
  //   const response = await resolveRecord(fqdn, 'TXT');
  //   if (!response.Answer) throw new Error(`Received no answer for '${fqdn}'.`);
  //   return response.Answer.map(r => r.data.slice(1, -1));
  // }

  const records = await dnsResolveTxt(fqdn);
  return records.map(r => r.join(' '));
};
