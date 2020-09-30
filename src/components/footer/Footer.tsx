import React from 'react';
import { Container } from 'components';
import { Button } from '@material-ui/core';
import Config from 'config';

const Footer: React.FC = () => {
  return (
    <Container>
      <div className='footer'>
        <Button className='footer-item btn-text' href={`${Config.etherscan}${Config.Token.address}`} target='_blank' >Z Contract</Button>
        <Button className='footer-item btn-text' href='https://app.uniswap.org' target='_blank' >Uniswap Z-ETH</Button>
        <Button className='footer-item btn-text' href='https://twitter.com/yTSLAFi' target='_blank' >Twitter</Button>
        <Button className='footer-item btn-text' href='https://t.me/yTSLA_lounge' target='_blank' >Telegram</Button>
      </div>
    </Container>
  )
}

export default Footer;
