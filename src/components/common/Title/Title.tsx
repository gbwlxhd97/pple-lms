type TitleProps = {
  title: string;
};

/**
 * 버티컬 border Line + 제목 컴포넌트
 * @param param0
 * @returns
 */
const Title = ({ title }: TitleProps) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className="Divider Vertical"></div>
      <div style={{ marginLeft: '16px' }}>{title}</div>
    </div>
  );
};

export default Title;
