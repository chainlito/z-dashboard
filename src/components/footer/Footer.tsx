import React from 'react';
import { Container } from 'components';
import { Button } from '@material-ui/core';
import Config from 'config';

const Footer: React.FC = () => {
  return (
    <Container>
      <div className='footer'>
        <Button className='footer-item btn-text' href={`${Config.etherscan}${Config.Token.address}`} target='_blank' >Z Contract</Button>
        <Button className='footer-item btn-text' href='https://uniswap.info/pair/0xf9f3e449ed119e0eac0d72c0b667363dd1539885' target='_blank' >Uniswap Z-ETH</Button>
        <Button className='footer-item btn-text' href='https://t.me/Ytoken' target='_blank' >Telegram</Button>
      </div>
    </Container>
  )
}

export default Footer;
