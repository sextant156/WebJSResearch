<List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item) => (
    <List.Item>
        <List.Item.Meta
        // avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />} 
        title={<a href="https://ant.design">{item.title}</a>}
        // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
        />
    </List.Item>
    )}
/>