// Random number generator - requires a PRNG backend, e.g. prng4.js
import {Arcfour, prng_newstate, rng_psize} from "./prng4";

let rng_state:Arcfour;
let rng_pool:number[] = null;
let rng_pptr:number;

// Initialize the pool with junk if needed.
if (rng_pool == null) {
  rng_pool = [];
  rng_pptr = 0;

}

function rng_get_byte() {
  if (rng_state == null) {
    rng_state = prng_newstate();
    // At this point, we may not have collected enough entropy.  If not, fall back to Math.random
    while (rng_pptr < rng_psize) {
      const random = Math.floor(65536 * Math.random());
      rng_pool[rng_pptr++] = random & 255;
    }
    rng_state.init(rng_pool);
    for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr) {
        rng_pool[rng_pptr] = 0;
    }
    rng_pptr = 0;
  }
  // TODO: allow reseeding after first request
  return rng_state.next();
}


export class SecureRandom {

  public nextBytes(ba:number[]) {
      for (let i = 0; i < ba.length; ++i) {
          ba[i] = rng_get_byte();
      }
  }
}
