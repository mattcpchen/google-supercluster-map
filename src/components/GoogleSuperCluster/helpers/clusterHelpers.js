
export const flattenClusterData = (supercluster, cluster) => {
  const children = supercluster.getChildren(cluster.id)
  const result = []
  children.forEach(child => {
    if (child.id) {
      const properties = flattenClusterData(supercluster, child)
      result.push(...properties)
    } else {
      result.push(child.properties)
    }
  })
  return result
}
