import { expect } from 'chai'

import '../../../../routes/expectations'

import * as feesServiceMock from '../../../../http-mocks/fees'
import { FeesClient } from 'fees/v2/feesClient'

describe('Fees client', () => {

  describe('on GET draft fees', () => {
    it('should return the data when the server replies', async () => {
      feesServiceMock.resolveGetFees()
      expect(FeesClient.searchFees('draft', 'author', 'approver', null, null)).to.not.equal(null)

    })
  })

  describe('on GET pending fees', () => {
    it('should return the data when the server replies', async () => {
      feesServiceMock.resolveGetFees()
      expect(FeesClient.searchFees('pending_approval', 'author', 'approver')).to.not.equal(null)

    })
  })

  describe('on GET fee', () => {
    it('should return the data of the fee', async () => {
      feesServiceMock.resolveGetFee()
      let user = { bearerToken: 'xxx' }
      expect(FeesClient.getFee(user, 'X0001')).to.not.equal(null)

    })
  })

  describe('on DELETE fee', () => {
    it('should return OK', async () => {
      feesServiceMock.resolveDeleteFee()

      let user = { bearerToken: 'xxx' }

      expect(FeesClient.deleteFee(user, 'X0001')).to.not.equal(null)

    })
  })

  describe('on PREVALIDATE fee', () => {
    it('should return OK', async () => {
      feesServiceMock.resolvePrevalidate()

      let user = { bearerToken: 'xxx' }

      expect(FeesClient.prevalidate(user, 'x','x','x','x','x','x','x','x')).to.not.equal(null)

      expect(FeesClient.prevalidate(user, 'x','x','x','x','x','x',null,null)).to.not.equal(null)

    })
  })

  function testTypeDataRetrieval(
    apiResolver: () => void,
    clientCall: () => Promise<any[]>,
    expectedValues: {name: string, creationTime: string, lastUpdated: string}[]
  ) {
    apiResolver();
    return clientCall().then(data => {
      expect(data).to.not.equal(null);
      expectedValues.forEach((expected, index) => {
        expect(data[index].name).to.equal(expected.name)
        expect(data[index].creationTime).to.equal(expected.creationTime)
        expect(data[index].lastUpdated).to.equal(expected.lastUpdated)
      });
    })
  }

  describe('on GET service-types', () => {
    it('should return data when the server replies', async () => {
      await testTypeDataRetrieval(
        feesServiceMock.resolveRetrieveServices,
        FeesClient.retrieveServices,
        [
          {name: 'service1', creationTime: '2020-01-01', lastUpdated: '2022-01-01'},
          {name: 'service2', creationTime: '2020-02-01', lastUpdated: '2022-02-01'},
        ]
      );
    });
  });

  describe('on GET direction-types', () => {
    it('should return data when the server replies', async () => {
      await testTypeDataRetrieval(
        feesServiceMock.resolveRetrieveDirections,
        FeesClient.retrieveDirections,
        [
          {name: 'direction1', creationTime: '2020-01-01', lastUpdated: '2022-01-01'},
          {name: 'direction2', creationTime: '2020-02-01', lastUpdated: '2022-02-01'},
        ]
      );
    });
  });

  describe('on GET channel types', () => {
    it('should return data when the server replies', async () => {
      await testTypeDataRetrieval(
        feesServiceMock.resolveRetrieveChannels,
        FeesClient.retrieveChannels,
        [
          {name: 'channel1', creationTime: '2020-01-01', lastUpdated: '2022-01-01'},
          {name: 'channel2', creationTime: '2020-02-01', lastUpdated: '2022-02-01'},
        ]
      );

    });
  });

  describe('on GET applicant types', () => {
    it('should return data when the server replies', async () => {
      await testTypeDataRetrieval(
        feesServiceMock.resolveRetrieveApplicants,
        FeesClient.retrieveApplicants,
        [
          {name: 'applicant1', creationTime: '2020-01-01', lastUpdated: '2022-01-01'},
          {name: 'applicant2', creationTime: '2020-02-01', lastUpdated: '2022-02-01'},
        ]
      );
    });
  });

  describe('on GET jurisdiction1 types', () => {
    it('should return data when the server replies', async () => {
      await testTypeDataRetrieval(
        feesServiceMock.resolveRetrieveJurisdiction1,
        FeesClient.retrieveJurisdiction1,
        [
          {name: 'jurisdiction1-1', creationTime: '2020-01-01', lastUpdated: '2022-01-01'},
          {name: 'jurisdiction1-2', creationTime: '2020-02-01', lastUpdated: '2022-02-01'},
        ]
      );
    });
  });

  describe('on GET jurisdiction2 types', () => {
    it('should return data when the server replies', async () => {
      await testTypeDataRetrieval(
        feesServiceMock.resolveRetrieveJurisdiction2,
        FeesClient.retrieveJurisdiction2,
        [
          {name: 'jurisdiction2-1', creationTime: '2020-01-01', lastUpdated: '2022-01-01'},
          {name: 'jurisdiction2-2', creationTime: '2020-02-01', lastUpdated: '2022-02-01'},
        ]
      );
    });
  });

  describe('on GET event types', () => {
    it('should return data when the server replies', async () => {
      await testTypeDataRetrieval(
        feesServiceMock.resolveRetrieveEvents,
        FeesClient.retrieveEvents,
        [
          {name: 'event1', creationTime: '2020-01-01', lastUpdated: '2022-01-01'},
          {name: 'event2', creationTime: '2020-02-01', lastUpdated: '2022-02-01'},
        ]
      );
    });
  });

})
