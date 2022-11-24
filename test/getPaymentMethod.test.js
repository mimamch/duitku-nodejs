test('Get Payment Methods', done => {
   const {
        getPaymentMethod
        } = require('../index.js');
    
    getPaymentMethod(10000, (resp, error) => {
        if (error) {
            done(error);
            return
          }
          try{
              expect(resp).toEqual(expect.arrayContaining([expect.objectContaining({
                "paymentMethod": expect.any(String),
                "paymentName": expect.any(String),
                "paymentImage": expect.any(String),
                "totalFee": expect.any(String)
            })]))
              done()
          } catch (error){
              done(error)
          }
    })
  });