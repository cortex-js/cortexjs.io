
export default function ChangeLog({children}) {
  return (
    <>
    <style>{`
    .markdown h2 {
      align-items: center;
      border-bottom: 2px solid var(--blue-600);
      color: var(--blue-600);
      display: flex;
    }      


    .markdown h2 em {
      margin-left: auto;
      color: var(--blue-600);
      display: block;
      float: right;
      font-size: .6em;
      font-style: normal;
      font-weight: 400
    }
  
    `}</style>{children}</>
  );
}