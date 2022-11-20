import style from './ThreeColumn.module.scss'

const ThreeColumn = () => (
  <div className={style.container}>
    <div className={style.center}></div>
    <div className={style.left}></div>
    <div className={style.right}></div>
  </div>
)

export default ThreeColumn
