import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Producto, ProductoRelations, Departamento, ProductoDepartamento, Ciudad, ProductoCiudad, Proveedor, ProductoProveedor, Empleado} from '../models';
import {ProductoDepartamentoRepository} from './producto-departamento.repository';
import {DepartamentoRepository} from './departamento.repository';
import {ProductoCiudadRepository} from './producto-ciudad.repository';
import {CiudadRepository} from './ciudad.repository';
import {ProductoProveedorRepository} from './producto-proveedor.repository';
import {ProveedorRepository} from './proveedor.repository';
import {EmpleadoRepository} from './empleado.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.id,
  ProductoRelations
> {

  public readonly departamentos: HasManyThroughRepositoryFactory<Departamento, typeof Departamento.prototype.id,
          ProductoDepartamento,
          typeof Producto.prototype.id
        >;

  public readonly ciudads: HasManyThroughRepositoryFactory<Ciudad, typeof Ciudad.prototype.id,
          ProductoCiudad,
          typeof Producto.prototype.id
        >;

  public readonly proveedors: HasManyThroughRepositoryFactory<Proveedor, typeof Proveedor.prototype.id,
          ProductoProveedor,
          typeof Producto.prototype.id
        >;

  public readonly empleado: BelongsToAccessor<Empleado, typeof Producto.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ProductoDepartamentoRepository') protected productoDepartamentoRepositoryGetter: Getter<ProductoDepartamentoRepository>, @repository.getter('DepartamentoRepository') protected departamentoRepositoryGetter: Getter<DepartamentoRepository>, @repository.getter('ProductoCiudadRepository') protected productoCiudadRepositoryGetter: Getter<ProductoCiudadRepository>, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>, @repository.getter('ProductoProveedorRepository') protected productoProveedorRepositoryGetter: Getter<ProductoProveedorRepository>, @repository.getter('ProveedorRepository') protected proveedorRepositoryGetter: Getter<ProveedorRepository>, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>,
  ) {
    super(Producto, dataSource);
    this.empleado = this.createBelongsToAccessorFor('empleado', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleado', this.empleado.inclusionResolver);
    this.proveedors = this.createHasManyThroughRepositoryFactoryFor('proveedors', proveedorRepositoryGetter, productoProveedorRepositoryGetter,);
    this.registerInclusionResolver('proveedors', this.proveedors.inclusionResolver);
    this.ciudads = this.createHasManyThroughRepositoryFactoryFor('ciudads', ciudadRepositoryGetter, productoCiudadRepositoryGetter,);
    this.registerInclusionResolver('ciudads', this.ciudads.inclusionResolver);
    this.departamentos = this.createHasManyThroughRepositoryFactoryFor('departamentos', departamentoRepositoryGetter, productoDepartamentoRepositoryGetter,);
    this.registerInclusionResolver('departamentos', this.departamentos.inclusionResolver);
  }
}
