//Header types
/* Request Headers*/
// *Accept =>Informs the server about the types of data that can be sent back.
// *Accept-charset=> utf-8 
// *Accept-encoding=> list of encoding but by the browsetr and saves bandwith to compress
// *Accept-lang => tells the list of lang en-us
// *Authorization => crendentials for the authentication hash of base 64 format
// *cache-control => cdn to cache the content, proxxies 
// *Connection => keep alive, continue with tcp  and don't terminate the connection fiexd amount of time to keep the connection
// *cookie=> previous cookie value to validate
// *Content-length => tells the content in bytes 
// *Content-type => type the body of the request like put request
// *Date => says ths current date and time
// *Host => localhost http://1.1
// *If-modified-since
// *If-unmodified
// *If-match
// *If-none-match
// *Pragma=> implementation specification something trigger on server side for debugging process
// *Range
// *user-agent => what client software is used  and os is used
// *via => different proxies is used
// *X-forwarded For => when ever the request process from the proxy servers

/**Response Headers */

// * Acess control allow origin => which website can participate * and wild card values
// * Accept - ranges => partial content range bytes
// * Age => age of the object in proxy server
// * Allow=> it tells wat are the http method is used
// * Cache control => cache 3600 seconds
// * Connection=> 
// * Content disposition =>tells the brwoser to load it tells to download the files
// * Contentencoding=> tells the content to encode
// *Content Lang => en-us
// * Content length
//  * Content Type =>
// * Date
//   * Etag => if match and if un match
//   * Expires
//   * Last modified => when the content is last modified
//     * Location => 
//     * Retry - after => retry after the 100 seconds
//     * server => identify wat server  is used
//     * set - cookie => 
//     * Transfer encoding
//     * Vary
//     * via
//     * WWW - Authenticate
// *Strict transport security