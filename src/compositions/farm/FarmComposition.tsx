import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Config from 'config';

import { Container, Header, Footer } from 'components';
import { RootState } from 'types';
import { selectAccount } from 'store/account/accountSelector';
import PoolCard from './PoolCard';

import Farm1Icon from 'assets/img/token-y.png';
import Farm2Icon from 'assets/img/token-lp.png';
import { web3client, dexclient } from 'lib';

interface StateFromProps {
  account: ReturnType<typeof selectAccount>;
}
interface DispatchFromProps {}
interface OwnProps {}

type Props = StateFromProps & DispatchFromProps & OwnProps;

const FarmComposition = () => {
  const [tokenPrice, setTokenPrice] = React.useState<number>(0);
  const [pool1APY, setPool1APY] = React.useState<number>(0);
  const [pool2APY, setPool2APY] = React.useState<number>(0);
  const [pool1Staked, setPool1Staked] = React.useState<number>(0);
  const [pool2Staked, setPool2Staked] = React.useState<number>(0);
  useEffect(() => {
    dexclient.getZTokenPrice().then(res => setTokenPrice(res));
    web3client.getTotalSupply(web3client.pool1Contract).then(res => setPool1Staked(res));
    web3client.getTotalSupply(web3client.pool2Contract).then(res => setPool2Staked(res));
  });
  useEffect(() => {
    if (tokenPrice && pool1Staked && pool2Staked) {
      dexclient.getYTokenPrice().then(price => {
        web3client.poolGetRewardRate(web3client.pool1Contract).then(res => {
          const roi = res * tokenPrice / pool1Staked / price * 86400 * 365 * 100;
          setPool1APY(roi);
        });
      })

      dexclient.getLpTokenPrice().then(price => {
        web3client.poolGetRewardRate(web3client.pool2Contract).then(res => {
            const roi = res * tokenPrice / pool2Staked / price * 86400 * 365 * 100;
            setPool2APY(roi);
        });
      });
    }
  }, [tokenPrice, pool1Staked, pool2Staked]);

  return (
    <React.Fragment>
      <Header />
      <Container>
        <div className='flex-v screen-center'>
          <div className='mt-30 mb-20 center-h text-red'>
            <span>Redeem Ƶ for NFTs at &nbsp;</span>
            <a href='https://ztoken.art/'>Ztoken.art</a>
          </div>
          <div className='mb-20'>
            <div className='center-h text-title mb-10'>
              Select a farm
            </div>
            <div className='center-h text-small'>
              Earn {Config.Token.symbol} tokens by providing liquidity
            </div>
          </div>
          <div className='center-h wp-100 mt-30 home-container'>
            <PoolCard stakingToken={Config.YToken} picture={Farm1Icon} poolUrl='/farm-y' apy={pool1APY} rewardPercent={16.67} />
            <PoolCard stakingToken={Config.UniLpToken} picture={Farm2Icon} poolUrl='/farm-lp' apy={pool2APY} rewardPercent={83.33} />
          </div>
        </div>
      </Container>
      <Footer />
    </React.Fragment>
  )
}

function mapStateToProps(
  state: RootState,
): StateFromProps {
  return {
    account: selectAccount(state),
  };
}
function mapDispatchToProps(dispatch: Dispatch): DispatchFromProps {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FarmComposition)
