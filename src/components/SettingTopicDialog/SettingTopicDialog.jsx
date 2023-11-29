import React from 'react';
import { Drawer } from 'antd';
import './SettingTopicDialog.scss'
export default function SettingTopicDialog(props) {
  let topicIndex = localStorage.getItem("topic_number") || 0
  let list = [];
  for (let i = 0; i < 14; i++) {
    list.push({
      id: i,
      imgData: require(`@/assets/images/0${i + 1}.png`)
    })
  }
  const chooseTopic = (e, id) => {
    let topicDivs = document.querySelectorAll('.topic')
    topicDivs.forEach(item => {
      item.className = 'topic'
    })
    e.target.parentNode.className += " active";
    localStorage.setItem('topic_number', id)
  }
  const onSubmit = () => { }
  return (
    <Drawer title="创建角色" placement="right" onClose={props.onClose} open={props.open}>
      <div className='topic_main'>
        {
          list.map((item, index) => {
            if (index === topicIndex) {
              return <div key={item.id} className='topic active' onClick={(e) => { chooseTopic(e, item.id) }}>
                <img src={item.imgData} alt="" />
              </div>
            }
            return <div key={item.id} className='topic' onClick={(e) => { chooseTopic(e, item.id) }}>
              <img src={item.imgData} alt="" />
            </div>
          })
        }
      </div>

    </Drawer>
  )
}