import {
    FacebookShareButton,
    GooglePlusShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    TelegramShareButton,
    WhatsappShareButton,
    PinterestShareButton,
    VKShareButton,
    OKShareButton,
    RedditShareButton,
    TumblrShareButton,
    LivejournalShareButton,
    MailruShareButton,
    ViberShareButton,
    WorkplaceShareButton,
    EmailShareButton,
  } from 'react-share';
  import {
    EmailIcon,
    FacebookIcon,
    InstapaperIcon,
    LineIcon,
    LinkedinIcon,
    LivejournalIcon,
    MailruIcon,
    OKIcon,
    PinterestIcon,
    PocketIcon,
    RedditIcon,
    TelegramIcon,
    TumblrIcon,
    TwitterIcon,
    ViberIcon,
    VKIcon,
    WeiboIcon,
    WhatsappIcon,
    WorkplaceIcon,
  } from "react-share";
  import React from 'react';

  export class ShareButtons extends React.Component{

    render(){
        var margin = '5px'
        var url = this.props.url
        return (<div>
            <FacebookShareButton style={{margin:margin}} url={url}><FacebookIcon size={32} round={true}/></FacebookShareButton>
            <WhatsappShareButton style={{margin:margin}} url={url}><WhatsappIcon size={32} round={true}/></WhatsappShareButton>
            <TwitterShareButton style={{margin:margin}} url={url}><TwitterIcon size={32} round={true}/></TwitterShareButton>
            <EmailShareButton style={{margin:margin}} url={url}><EmailIcon size={32} round={true}/></EmailShareButton>
            <TelegramShareButton style={{margin:margin}} url={url}><TelegramIcon size={32} round={true}/></TelegramShareButton>
            </div>)
    }
  }