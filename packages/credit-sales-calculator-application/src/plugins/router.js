import CreditsalesDataService from '../utils/creditsalesDataService.js';
import CreditSalesCalculatorRoute from '../routes/creditsalsedatacalculator.js'
import {POSTGRES_URL} from '../utils/config.js';

class CreditSalesCalculatorRouter{
  
  #routes = [];
  
  constructor(creditSalesCalculatorRoute) {
    this.#routes = this.#routes.concat(creditSalesCalculatorRoute.getDeclaredApis());
  }
  routes = () => {
    return {
      name: 'router',
      register: server => { server.route(this.#routes) }
    }
  }
}
// const routes = [].concat((new CreditSalesCalculatorRoute(new CreditsalesDataService(POSTGRES_URL))).getDeclaredApis());
//
// const router = {
//   name: 'router',
//   register: server => { server.route(routes) }
// }
//
// export default router

export default CreditSalesCalculatorRouter;
