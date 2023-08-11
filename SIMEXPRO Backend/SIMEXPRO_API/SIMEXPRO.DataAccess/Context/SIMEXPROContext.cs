﻿
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using SIMEXPRO.Entities.Entities;

#nullable disable

namespace SIMEXPRO.DataAccess.Context
{
    public partial class SIMEXPROContext : DbContext
    {
        public SIMEXPROContext()
        {
        }

        public SIMEXPROContext(DbContextOptions<SIMEXPROContext> options)
            : base(options)
        {
        }

        public virtual DbSet<tbAduanas> tbAduanas { get; set; }
        public virtual DbSet<tbAldeas> tbAldeas { get; set; }
        public virtual DbSet<tbAranceles> tbAranceles { get; set; }
        public virtual DbSet<tbArea> tbArea { get; set; }
        public virtual DbSet<tbAsignacionesOrden> tbAsignacionesOrden { get; set; }
        public virtual DbSet<tbAsignacionesOrdenDetalle> tbAsignacionesOrdenDetalle { get; set; }
        public virtual DbSet<tbBaseCalculos> tbBaseCalculos { get; set; }
        public virtual DbSet<tbBaseCalculosHistorial> tbBaseCalculosHistorial { get; set; }
        public virtual DbSet<tbBoletinPago> tbBoletinPago { get; set; }
        public virtual DbSet<tbBoletinPagoDetalles> tbBoletinPagoDetalles { get; set; }
        public virtual DbSet<tbCargos> tbCargos { get; set; }
        public virtual DbSet<tbCategoria> tbCategoria { get; set; }
        public virtual DbSet<tbCiudades> tbCiudades { get; set; }
        public virtual DbSet<tbClientes> tbClientes { get; set; }
        public virtual DbSet<tbCodigoImpuesto> tbCodigoImpuesto { get; set; }
        public virtual DbSet<tbColonias> tbColonias { get; set; }
        public virtual DbSet<tbColores> tbColores { get; set; }
        public virtual DbSet<tbComercianteIndividual> tbComercianteIndividual { get; set; }
        public virtual DbSet<tbConceptoPago> tbConceptoPago { get; set; }
        public virtual DbSet<tbCondiciones> tbCondiciones { get; set; }
        public virtual DbSet<tbCondicionesComerciales> tbCondicionesComerciales { get; set; }
        public virtual DbSet<tbCondicionesHistorial> tbCondicionesHistorial { get; set; }
        public virtual DbSet<tbConductor> tbConductor { get; set; }
        public virtual DbSet<tbDeclaraciones_Valor> tbDeclaraciones_Valor { get; set; }
        public virtual DbSet<tbDeclaraciones_ValorHistorial> tbDeclaraciones_ValorHistorial { get; set; }
        public virtual DbSet<tbDeclarantes> tbDeclarantes { get; set; }
        public virtual DbSet<tbDeclarantesHistorial> tbDeclarantesHistorial { get; set; }
        public virtual DbSet<tbDocumentosContratos> tbDocumentosContratos { get; set; }
        public virtual DbSet<tbDocumentosDeSoporte> tbDocumentosDeSoporte { get; set; }
        public virtual DbSet<tbDocumentosPDF> tbDocumentosPDF { get; set; }
        public virtual DbSet<tbDocumentosPDFHistorial> tbDocumentosPDFHistorial { get; set; }
        public virtual DbSet<tbDuca> tbDuca { get; set; }
        public virtual DbSet<tbDucaHistorial> tbDucaHistorial { get; set; }
        public virtual DbSet<tbEmpleados> tbEmpleados { get; set; }
        public virtual DbSet<tbEstadoBoletin> tbEstadoBoletin { get; set; }
        public virtual DbSet<tbEstadoMercancias> tbEstadoMercancias { get; set; }
        public virtual DbSet<tbEstadosCiviles> tbEstadosCiviles { get; set; }
        public virtual DbSet<tbEstilos> tbEstilos { get; set; }
        public virtual DbSet<tbFacturas> tbFacturas { get; set; }
        public virtual DbSet<tbFacturasExportacion> tbFacturasExportacion { get; set; }
        public virtual DbSet<tbFacturasExportacionDetalles> tbFacturasExportacionDetalles { get; set; }
        public virtual DbSet<tbFacturasHistorial> tbFacturasHistorial { get; set; }
        public virtual DbSet<tbFormas_Envio> tbFormas_Envio { get; set; }
        public virtual DbSet<tbFormasdePago> tbFormasdePago { get; set; }
        public virtual DbSet<tbFuncionesMaquina> tbFuncionesMaquina { get; set; }
        public virtual DbSet<tbImportadores> tbImportadores { get; set; }
        public virtual DbSet<tbImportadoresHistorial> tbImportadoresHistorial { get; set; }
        public virtual DbSet<tbImpuestos> tbImpuestos { get; set; }
        public virtual DbSet<tbImpuestosPorArancel> tbImpuestosPorArancel { get; set; }
        public virtual DbSet<tbIncoterm> tbIncoterm { get; set; }
        public virtual DbSet<tbIntermediarios> tbIntermediarios { get; set; }
        public virtual DbSet<tbIntermediariosHistorial> tbIntermediariosHistorial { get; set; }
        public virtual DbSet<tbItems> tbItems { get; set; }
        public virtual DbSet<tbItemsHistorial> tbItemsHistorial { get; set; }
        public virtual DbSet<tbLiquidacionGeneral> tbLiquidacionGeneral { get; set; }
        public virtual DbSet<tbLiquidacionGeneralHistorial> tbLiquidacionGeneralHistorial { get; set; }
        public virtual DbSet<tbLiquidacionPorLinea> tbLiquidacionPorLinea { get; set; }
        public virtual DbSet<tbLotes> tbLotes { get; set; }
        public virtual DbSet<tbLugaresEmbarque> tbLugaresEmbarque { get; set; }
        public virtual DbSet<tbMaquinaHistorial> tbMaquinaHistorial { get; set; }
        public virtual DbSet<tbMaquinas> tbMaquinas { get; set; }
        public virtual DbSet<tbMarcas> tbMarcas { get; set; }
        public virtual DbSet<tbMarcasMaquina> tbMarcasMaquina { get; set; }
        public virtual DbSet<tbMateriales> tbMateriales { get; set; }
        public virtual DbSet<tbMaterialesBrindar> tbMaterialesBrindar { get; set; }
        public virtual DbSet<tbModelosMaquina> tbModelosMaquina { get; set; }
        public virtual DbSet<tbModoTransporte> tbModoTransporte { get; set; }
        public virtual DbSet<tbModulos> tbModulos { get; set; }
        public virtual DbSet<tbMonedas> tbMonedas { get; set; }
        public virtual DbSet<tbNivelesComerciales> tbNivelesComerciales { get; set; }
        public virtual DbSet<tbOficinas> tbOficinas { get; set; }
        public virtual DbSet<tbOficio_Profesiones> tbOficio_Profesiones { get; set; }
        public virtual DbSet<tbOrde_Ensa_Acab_Etiq> tbOrde_Ensa_Acab_Etiq { get; set; }
        public virtual DbSet<tbOrdenCompra> tbOrdenCompra { get; set; }
        public virtual DbSet<tbOrdenCompraDetalles> tbOrdenCompraDetalles { get; set; }
        public virtual DbSet<tbPaises> tbPaises { get; set; }
        public virtual DbSet<tbPantallas> tbPantallas { get; set; }
        public virtual DbSet<tbPedidosOrden> tbPedidosOrden { get; set; }
        public virtual DbSet<tbPedidosOrdenDetalle> tbPedidosOrdenDetalle { get; set; }
        public virtual DbSet<tbPedidosProduccion> tbPedidosProduccion { get; set; }
        public virtual DbSet<tbPedidosProduccionDetalles> tbPedidosProduccionDetalles { get; set; }
        public virtual DbSet<tbPersonaJuridica> tbPersonaJuridica { get; set; }
        public virtual DbSet<tbPersonaNatural> tbPersonaNatural { get; set; }
        public virtual DbSet<tbPersonas> tbPersonas { get; set; }
        public virtual DbSet<tbProcesos> tbProcesos { get; set; }
        public virtual DbSet<tbProveedores> tbProveedores { get; set; }
        public virtual DbSet<tbProveedoresDeclaracion> tbProveedoresDeclaracion { get; set; }
        public virtual DbSet<tbProveedoresDeclaracionHistorial> tbProveedoresDeclaracionHistorial { get; set; }
        public virtual DbSet<tbProvincias> tbProvincias { get; set; }
        public virtual DbSet<tbReporteModuloDia> tbReporteModuloDia { get; set; }
        public virtual DbSet<tbReporteModuloDiaDetalle> tbReporteModuloDiaDetalle { get; set; }
        public virtual DbSet<tbRevisionDeCalidad> tbRevisionDeCalidad { get; set; }
        public virtual DbSet<tbRoles> tbRoles { get; set; }
        public virtual DbSet<tbRolesXPantallas> tbRolesXPantallas { get; set; }
        public virtual DbSet<tbSubcategoria> tbSubcategoria { get; set; }
        public virtual DbSet<tbTallas> tbTallas { get; set; }
        public virtual DbSet<tbTipoDocumento> tbTipoDocumento { get; set; }
        public virtual DbSet<tbTipoEmbalaje> tbTipoEmbalaje { get; set; }
        public virtual DbSet<tbTipoIntermediario> tbTipoIntermediario { get; set; }
        public virtual DbSet<tbTipoLiquidacion> tbTipoLiquidacion { get; set; }
        public virtual DbSet<tbTiposIdentificacion> tbTiposIdentificacion { get; set; }
        public virtual DbSet<tbTransporte> tbTransporte { get; set; }
        public virtual DbSet<tbUnidadMedidas> tbUnidadMedidas { get; set; }
        public virtual DbSet<tbUsuarios> tbUsuarios { get; set; }
        public virtual DbSet<tbUsuariosHistorial> tbUsuariosHistorial { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<tbAduanas>(entity =>
            {
                entity.HasKey(e => e.adua_Id)
                    .HasName("PK_Adua_tbAduanas_adua_Id");

                entity.ToTable("tbAduanas", "Adua");

                entity.HasIndex(e => e.adua_Codigo, "UQ_Adua_tbAduanas_adua_Codigo")
                    .IsUnique();

                entity.Property(e => e.adua_Codigo)
                    .IsRequired()
                    .HasMaxLength(4)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.adua_Direccion_Exacta)
                    .IsRequired()
                    .HasMaxLength(800);

                entity.Property(e => e.adua_Estado)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.adua_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.adua_FechaEliminacion).HasColumnType("datetime");

                entity.Property(e => e.adua_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.adua_Nombre)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbAduanasusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_tbAduanas_tbUsuarios_adua_UsucCrea");

                entity.HasOne(d => d.usua_UsuarioEliminacionNavigation)
                    .WithMany(p => p.tbAduanasusua_UsuarioEliminacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioEliminacion)
                    .HasConstraintName("FK_Adua_tbAduanas_tbUsuarios_adua_usua_UsuarioEliminacion");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbAduanasusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Adua_tbAduanas_tbUsuarios_adua_usua_UsuarioModificacion");
            });

            modelBuilder.Entity<tbAldeas>(entity =>
            {
                entity.HasKey(e => e.alde_Id)
                    .HasName("PK_Gral_tbAldeas_alde_Id");

                entity.ToTable("tbAldeas", "Gral");

                entity.HasIndex(e => new { e.alde_Nombre, e.ciud_Id }, "UQ_tbAldeas_alde_Nombre_ciud_Id")
                    .IsUnique();

                entity.Property(e => e.alde_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.alde_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.alde_FechaEliminacion).HasColumnType("datetime");

                entity.Property(e => e.alde_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.alde_Nombre)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.HasOne(d => d.ciud)
                    .WithMany(p => p.tbAldeas)
                    .HasForeignKey(d => d.ciud_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Gral_tbCiudades_Gral_tbAldeas_ciud_Id");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbAldeasusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Gral_tbAldeas_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioEliminacionNavigation)
                    .WithMany(p => p.tbAldeasusua_UsuarioEliminacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioEliminacion)
                    .HasConstraintName("FK_Gral_tbAldeas_usua_UsuarioEliminacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbAldeasusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Gral_tbAldeas_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id");
            });

            modelBuilder.Entity<tbAranceles>(entity =>
            {
                entity.HasKey(e => e.aran_Id)
                    .HasName("PK_Adua_tbAranceles_aran_Id");

                entity.ToTable("tbAranceles", "Adua");

                entity.HasIndex(e => e.aran_Codigo, "UQ_Adua_tbAranceles_aran_Codigo")
                    .IsUnique();

                entity.Property(e => e.aram_Estado)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.aran_Codigo)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.aran_Descripcion).IsRequired();

                entity.Property(e => e.aran_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.aran_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbArancelesusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_tbAranceles_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbArancelesusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Adua_tbAranceles_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id");
            });

            modelBuilder.Entity<tbArea>(entity =>
            {
                entity.HasKey(e => e.tipa_Id)
                    .HasName("PK_Prod_tbArea_tipa_Id");

                entity.ToTable("tbArea", "Prod");

                entity.HasIndex(e => e.tipa_area, "UQ_Prod_tbArea_tipa_area")
                    .IsUnique();

                entity.Property(e => e.tipa_Estado)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.tipa_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.tipa_FechaEliminacion).HasColumnType("datetime");

                entity.Property(e => e.tipa_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.tipa_area)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.HasOne(d => d.proc)
                    .WithMany(p => p.tbArea)
                    .HasForeignKey(d => d.proc_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbArea_proc_Id_Prod_tbProcesos_proc_Id");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbAreausua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbArea_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioEliminacionNavigation)
                    .WithMany(p => p.tbAreausua_UsuarioEliminacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioEliminacion)
                    .HasConstraintName("FK_Prod_tbArea_usua_UsuarioEliminacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbAreausua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Prod_tbArea_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id");
            });

            modelBuilder.Entity<tbAsignacionesOrden>(entity =>
            {
                entity.HasKey(e => e.asor_Id)
                    .HasName("PK_Prod_tbAsignacionesOrden_asor_Id");

                entity.ToTable("tbAsignacionesOrden", "Prod");

                entity.Property(e => e.asor_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.asor_FechaInicio).HasColumnType("date");

                entity.Property(e => e.asor_FechaLimite).HasColumnType("date");

                entity.Property(e => e.asor_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.asor_OrdenDet)
                    .WithMany(p => p.tbAsignacionesOrden)
                    .HasForeignKey(d => d.asor_OrdenDetId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbAsignacionesOrden_tbOrdenCompraDetalles_asor_OrdenDetId");

                entity.HasOne(d => d.empl)
                    .WithMany(p => p.tbAsignacionesOrden)
                    .HasForeignKey(d => d.empl_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbAsignacionesOrden_Gral_tbEmpleados_empl_Id");

                entity.HasOne(d => d.proc)
                    .WithMany(p => p.tbAsignacionesOrden)
                    .HasForeignKey(d => d.proc_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbAsignacionesOrden_tbProcesos_proc_Id");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbAsignacionesOrdenusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbAsignacionesOrden_tbUsuarios_asor_UsuCrea");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbAsignacionesOrdenusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Prod_tbAsignacionesOrden_tbUsuarios_asor_UsuModifica");
            });

            modelBuilder.Entity<tbAsignacionesOrdenDetalle>(entity =>
            {
                entity.HasKey(e => e.adet_Id)
                    .HasName("PK_Prod_tbAsignacionesModuloDetalle_adet_Id");

                entity.ToTable("tbAsignacionesOrdenDetalle", "Prod");

                entity.Property(e => e.adet_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.adet_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.asor)
                    .WithMany(p => p.tbAsignacionesOrdenDetalle)
                    .HasForeignKey(d => d.asor_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbAsignacionesModuloDetalle_tbtbAsignacionesOrden_asor_Id");

                entity.HasOne(d => d.lote)
                    .WithMany(p => p.tbAsignacionesOrdenDetalle)
                    .HasForeignKey(d => d.lote_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbAsignacionesModuloDetalle_tbLotes_lote_Id");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbAsignacionesOrdenDetalleusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbAsignacionesModuloDetalle_tbUsuarios_amod_UsuCrea");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbAsignacionesOrdenDetalleusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Prod_tbAsignacionesModuloDetalle_tbUsuarios_amod_UsuModifica");
            });

            modelBuilder.Entity<tbBaseCalculos>(entity =>
            {
                entity.HasKey(e => e.base_Id)
                    .HasName("PK_Adua_tbBaseCalculos_base_Id");

                entity.ToTable("tbBaseCalculos", "Adua");

                entity.Property(e => e.base_ComisionCorrelaje).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.base_Costos_Seguro).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.base_Deducciones_Legales).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.base_Derechos_Impuestos).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.base_Estado)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.base_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.base_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.base_Gasto_Envase_Embalaje).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.base_Gasto_TransporteM_Importada).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.base_Gastos_Asistencia_Tecnica).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.base_Gastos_Carga_Importada).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.base_Gastos_Transporte_Posterior).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.base_MontCondicion).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.base_MontoReversion).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.base_Monto_Intereses).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.base_PagosIndirectos).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.base_PrecioFactura).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.base_PrecioReal).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.base_Total_Ajustes_Precio_Pagado).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.base_Total_Deducciones_Precio).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.base_Valor_Aduana).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.base_Valor_Canones).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.base_Valor_Ingenieria_Importado).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.base_Valor_Materiales_Consumidos).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.base_Valor_Materiales_Utilizados).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.base_ValoresMateriales_Incorporado).HasColumnType("decimal(18, 2)");

                entity.HasOne(d => d.deva)
                    .WithMany(p => p.tbBaseCalculos)
                    .HasForeignKey(d => d.deva_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_tbDeclaraciones_Valor_Adua_tbBaseCalculos_deva_Id");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbBaseCalculosusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbBaseCalculos_tbUsuarios_base_UsuarioCreacion");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbBaseCalculosusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Prod_tbBaseCalculos_tbUsuarios_base_usua_UsuarioModificacion");
            });

            modelBuilder.Entity<tbBaseCalculosHistorial>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("tbBaseCalculosHistorial", "Adua");

                entity.Property(e => e.base_ComisionCorrelaje).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.base_Costos_Seguro).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.base_Deducciones_Legales).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.base_Derechos_Impuestos).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.base_Gasto_Envase_Embalaje).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.base_Gasto_TransporteM_Importada).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.base_Gastos_Asistencia_Tecnica).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.base_Gastos_Carga_Importada).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.base_Gastos_Transporte_Posterior).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.base_MontCondicion).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.base_MontoReversion).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.base_Monto_Intereses).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.base_PagosIndirectos).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.base_PrecioFactura).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.base_PrecioReal).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.base_Total_Ajustes_Precio_Pagado).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.base_Total_Deducciones_Precio).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.base_Valor_Aduana).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.base_Valor_Canones).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.base_Valor_Ingenieria_Importado).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.base_Valor_Materiales_Consumidos).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.base_Valor_Materiales_Utilizados).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.base_ValoresMateriales_Incorporado).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.hbas_Accion).HasMaxLength(100);

                entity.Property(e => e.hbas_FechaAccion).HasColumnType("datetime");

                entity.Property(e => e.hbas_Id).ValueGeneratedOnAdd();
            });

            modelBuilder.Entity<tbBoletinPago>(entity =>
            {
                entity.HasKey(e => e.boen_Id)
                    .HasName("PK_Adua_tbBoletinPago_boen_Id");

                entity.ToTable("tbBoletinPago", "Adua");

                entity.Property(e => e.boen_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.boen_FechaEmision).HasColumnType("date");

                entity.Property(e => e.boen_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.boen_NDeclaracion)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.boen_Observaciones)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.boen_Preimpreso).IsRequired();

                entity.Property(e => e.boen_TotalGarantizar).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.boen_TotalPagar).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.duca_No_Duca).HasMaxLength(100);

                entity.HasOne(d => d.coim)
                    .WithMany(p => p.tbBoletinPago)
                    .HasForeignKey(d => d.coim_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_tbBoletinPago_coim_Id_Adua_tbCodigoImpuesto_coim_Id");

                entity.HasOne(d => d.duca_No_DucaNavigation)
                    .WithMany(p => p.tbBoletinPago)
                    .HasForeignKey(d => d.duca_No_Duca)
                    .HasConstraintName("FK_Adua_tbBoletinPago_tbDuca_duca_No_Duca");

                entity.HasOne(d => d.esbo)
                    .WithMany(p => p.tbBoletinPago)
                    .HasForeignKey(d => d.esbo_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_tbBoletinPago_esbo_Id_Adua_tbEstadoBoletin_esbo_Id");

                entity.HasOne(d => d.liqu)
                    .WithMany(p => p.tbBoletinPago)
                    .HasForeignKey(d => d.liqu_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_tbBoletinPago_lige_Id_Adua_tbLiquidacionGeneral_lige_Id");

                entity.HasOne(d => d.tipl)
                    .WithMany(p => p.tbBoletinPago)
                    .HasForeignKey(d => d.tipl_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_tbBoletinPago_tipl_Id_Adua_tbTipoLiquidacion_tipl_Id");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbBoletinPagousua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_tbBoletinPago_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbBoletinPagousua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Adua_tbBoletinPago_Acce_tbUsuarios_usua_UsuModificacion_usua_Id");
            });

            modelBuilder.Entity<tbBoletinPagoDetalles>(entity =>
            {
                entity.HasKey(e => e.bode_Id)
                    .HasName("PK_Adua_tbBoletinPagoDetalles_bode_Id");

                entity.ToTable("tbBoletinPagoDetalles", "Adua");

                entity.Property(e => e.bode_Concepto)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.bode_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.bode_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.bode_TipoObligacion)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.boen)
                    .WithMany(p => p.tbBoletinPagoDetalles)
                    .HasForeignKey(d => d.boen_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_tbBoletinPagoDetalles_boen_Id_Adua_tbBoletinPago_boen_Id");

                entity.HasOne(d => d.lige)
                    .WithMany(p => p.tbBoletinPagoDetalles)
                    .HasForeignKey(d => d.lige_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_tbBoletinPagoDetalles_lige_Id_Adua_tbLiquidacionGeneral_lige_Id");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbBoletinPagoDetallesusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_tbBoletinPagoDetalles_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbBoletinPagoDetallesusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Adua_tbBoletinPagoDetalles_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id");
            });

            modelBuilder.Entity<tbCargos>(entity =>
            {
                entity.HasKey(e => e.carg_Id)
                    .HasName("PK_Gral_tbCargos_carg_Id");

                entity.ToTable("tbCargos", "Gral");

                entity.HasIndex(e => e.carg_Nombre, "UQ_Gral_tbCargos__carg_Nombre")
                    .IsUnique();

                entity.Property(e => e.carg_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.carg_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.carg_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.carg_Nombre)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbCargosusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Gral_tbCargos_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbCargosusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Gral_tbCargos_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id");
            });

            modelBuilder.Entity<tbCategoria>(entity =>
            {
                entity.HasKey(e => e.cate_Id)
                    .HasName("PK_Prod_tbCategoria_cate_Id");

                entity.ToTable("tbCategoria", "Prod");

                entity.HasIndex(e => e.cate_Descripcion, "UQ_Prod_tbCategoria_cate_Descripcion")
                    .IsUnique();

                entity.Property(e => e.cate_Descripcion)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.cate_Estado)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.cate_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.cate_FechaEliminacion).HasColumnType("datetime");

                entity.Property(e => e.cate_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbCategoriausua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbCategoria_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioEliminacionNavigation)
                    .WithMany(p => p.tbCategoriausua_UsuarioEliminacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioEliminacion)
                    .HasConstraintName("FK_Prod_tbCategoria_usua_UsuarioEliminacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbCategoriausua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Prod_tbCategoria_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id");
            });

            modelBuilder.Entity<tbCiudades>(entity =>
            {
                entity.HasKey(e => e.ciud_Id)
                    .HasName("PK_Gral_tbCiudades_ciud_Id");

                entity.ToTable("tbCiudades", "Gral");

                entity.HasIndex(e => new { e.pvin_Id, e.ciud_Nombre }, "UQ_Gral_tbCiudades_ciud_Nombre_pvin_Id")
                    .IsUnique();

                entity.Property(e => e.ciud_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.ciud_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.ciud_FechaEliminacion).HasColumnType("datetime");

                entity.Property(e => e.ciud_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.ciud_Nombre)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.HasOne(d => d.pvin)
                    .WithMany(p => p.tbCiudades)
                    .HasForeignKey(d => d.pvin_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Gral_tbProvincias_Gral_tbCiudades_pvin_Id");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbCiudadesusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Gral_tbCiudades_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioEliminacionNavigation)
                    .WithMany(p => p.tbCiudadesusua_UsuarioEliminacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioEliminacion)
                    .HasConstraintName("FK_Gral_tbCiudades_usua_UsuarioEliminacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbCiudadesusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Gral_tbCiudades_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id");
            });

            modelBuilder.Entity<tbClientes>(entity =>
            {
                entity.HasKey(e => e.clie_Id)
                    .HasName("PK_Prod_tbClientes_clie_Id");

                entity.ToTable("tbClientes", "Prod");

                entity.HasIndex(e => e.clie_RTN, "UQ_Prod_tbClientes_clie_RTN")
                    .IsUnique();

                entity.Property(e => e.clie_Correo_Electronico)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.clie_Direccion)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.clie_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.clie_FAX).HasMaxLength(50);

                entity.Property(e => e.clie_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.clie_FechaEliminacion).HasColumnType("datetime");

                entity.Property(e => e.clie_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.clie_Nombre_Contacto)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.clie_Nombre_O_Razon_Social)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.clie_Numero_Contacto)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.clie_RTN)
                    .IsRequired()
                    .HasMaxLength(40);

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbClientesusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbClientes_clie_UsuarioCreacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioEliminacionNavigation)
                    .WithMany(p => p.tbClientesusua_UsuarioEliminacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioEliminacion)
                    .HasConstraintName("FK_Prod_tbClientes_usua_UsuarioEliminacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbClientesusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Prod_tbClientes_clie_UsuarioModificacion_Acce_tbUsuarios_usua_Id");
            });

            modelBuilder.Entity<tbCodigoImpuesto>(entity =>
            {
                entity.HasKey(e => e.coim_Id)
                    .HasName("PK_Adua_tbCodigoImpuesto_coim_Id");

                entity.ToTable("tbCodigoImpuesto", "Adua");

                entity.Property(e => e.coim_Descripcion)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.coim_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.coim_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.coim_FechaEliminacion).HasColumnType("datetime");

                entity.Property(e => e.coim_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbCodigoImpuestousua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_tbCodigoImpuesto_coim_UsuarioCreacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioEliminacionNavigation)
                    .WithMany(p => p.tbCodigoImpuestousua_UsuarioEliminacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioEliminacion)
                    .HasConstraintName("FK_Adua_tbCodigoImpuesto_usua_UsuarioEliminacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbCodigoImpuestousua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Adua_tbCodigoImpuesto_coim_UsuarioModificacion_Acce_tbUsuarios_usua_Id");
            });

            modelBuilder.Entity<tbColonias>(entity =>
            {
                entity.HasKey(e => e.colo_Id)
                    .HasName("PK_Gral_tbColonias_colo_Id");

                entity.ToTable("tbColonias", "Gral");

                entity.HasIndex(e => new { e.colo_Nombre, e.alde_Id, e.ciud_Id }, "UQ_Gral_tbAldeas_colo_Nombre_alde_Id_ciud_Id")
                    .IsUnique();

                entity.Property(e => e.colo_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.colo_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.colo_FechaEliminacion).HasColumnType("datetime");

                entity.Property(e => e.colo_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.colo_Nombre).HasMaxLength(150);

                entity.HasOne(d => d.alde)
                    .WithMany(p => p.tbColonias)
                    .HasForeignKey(d => d.alde_Id)
                    .HasConstraintName("FK_Gral_tbAldeas_Gral_tbColonias_alde_Id");

                entity.HasOne(d => d.ciud)
                    .WithMany(p => p.tbColonias)
                    .HasForeignKey(d => d.ciud_Id)
                    .HasConstraintName("FK_Gral_tbCiudades_Gral_tbColonias_ciud_Id");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbColoniasusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Gral_tbColonias_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioEliminacionNavigation)
                    .WithMany(p => p.tbColoniasusua_UsuarioEliminacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioEliminacion)
                    .HasConstraintName("FK_Gral_tbColonias_usua_UsuarioEliminacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbColoniasusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Gral_tbColonias_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id");
            });

            modelBuilder.Entity<tbColores>(entity =>
            {
                entity.HasKey(e => e.colr_Id)
                    .HasName("PK_Prod_tbColores_colr_Id");

                entity.ToTable("tbColores", "Prod");

                entity.HasIndex(e => e.colr_Nombre, "UQ_Prod_tbColores_colr_Nombre")
                    .IsUnique();

                entity.Property(e => e.colr_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.colr_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.colr_FechaEliminacion).HasColumnType("datetime");

                entity.Property(e => e.colr_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.colr_Nombre)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbColoresusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .HasConstraintName("FK_Prod_tbColores_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioEliminacionNavigation)
                    .WithMany(p => p.tbColoresusua_UsuarioEliminacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioEliminacion)
                    .HasConstraintName("FK_Prod_tbColores_usua_UsuarioEliminacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbColoresusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Prod_tbColores_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id");
            });

            modelBuilder.Entity<tbComercianteIndividual>(entity =>
            {
                entity.HasKey(e => e.coin_Id)
                    .HasName("PK_Adua_tbComercianteIndividual_coin_Id");

                entity.ToTable("tbComercianteIndividual", "Adua");

                entity.Property(e => e.coin_CorreoElectronico)
                    .IsRequired()
                    .HasMaxLength(30);

                entity.Property(e => e.coin_CorreoElectronicoAlternativo).HasMaxLength(30);

                entity.Property(e => e.coin_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.coin_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.coin_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.coin_NumeroLocalReprentante)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.coin_PuntoReferencia)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.coin_PuntoReferenciaReprentante)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.coin_TelefonoCelular)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.coin_TelefonoFijo)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.HasOne(d => d.coin_ColoniaRepresentanteNavigation)
                    .WithMany(p => p.tbComercianteIndividualcoin_ColoniaRepresentanteNavigation)
                    .HasForeignKey(d => d.coin_ColoniaRepresentante)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ComercianteIndividual_coin_ColoniaRepresentante_Gral_ColoniaRepresentante_colo_Id");

                entity.HasOne(d => d.colo)
                    .WithMany(p => p.tbComercianteIndividualcolo)
                    .HasForeignKey(d => d.colo_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ComercianteIndividual_colo_Id_Gral_Colonia_colo_Id");

                entity.HasOne(d => d.pers)
                    .WithMany(p => p.tbComercianteIndividual)
                    .HasForeignKey(d => d.pers_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ComercianteIndividual_pers_Id_Adua_Personas_pers_Id");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbComercianteIndividualusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_ComercianteIndividual_coin_UsuarioCreacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbComercianteIndividualusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Adua_ComercianteIndividual_coin_UsuarioModificacion_Acce_tbUsuarios_usua_Id");
            });

            modelBuilder.Entity<tbConceptoPago>(entity =>
            {
                entity.HasKey(e => e.copa_Id)
                    .HasName("PK_Adua_tbConceptoPago_copa_Id");

                entity.ToTable("tbConceptoPago", "Adua");

                entity.HasIndex(e => e.copa_Descripcion, "UQ_Adua_tbConceptoPago_copa_Descripcion")
                    .IsUnique();

                entity.Property(e => e.copa_Descripcion)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.copa_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.copa_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.copa_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbConceptoPagousua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_tbConceptoPago_copa_UsuarioCreacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbConceptoPagousua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Adua_tbConceptoPago_copa_UsuarioModificacion_Acce_tbUsuarios_usua_Id");
            });

            modelBuilder.Entity<tbCondiciones>(entity =>
            {
                entity.HasKey(e => e.codi_Id)
                    .HasName("PK_Adua_tbCondiciones_codi_Id");

                entity.ToTable("tbCondiciones", "Adua");

                entity.Property(e => e.codi_Concepto_Monto_Declarado).HasMaxLength(500);

                entity.Property(e => e.codi_Estado)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.codi_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.codi_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.codi_Indicar_Canones).HasMaxLength(500);

                entity.Property(e => e.codi_Indicar_Existe_Condicion).HasMaxLength(500);

                entity.Property(e => e.codi_Indicar_Restricciones_Utilizacion).HasMaxLength(500);

                entity.Property(e => e.codi_Tipo_Vinculacion).HasMaxLength(500);

                entity.HasOne(d => d.deva)
                    .WithMany(p => p.tbCondiciones)
                    .HasForeignKey(d => d.deva_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_tbDeclaraciones_Valor_Adua_tbCondiciones_deva_Id");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbCondicionesusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbCondiciones_tbUsuarios_base_UsuarioCreacion");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbCondicionesusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Prod_tbCondiciones_tbUsuarios_base_usua_UsuarioModificacion");
            });

            modelBuilder.Entity<tbCondicionesComerciales>(entity =>
            {
                entity.HasKey(e => e.coco_Id)
                    .HasName("PK_Adua_tbCondicionesComerciales_coco_Id");

                entity.ToTable("tbCondicionesComerciales", "Adua");

                entity.Property(e => e.coco_Codigo)
                    .IsRequired()
                    .HasMaxLength(2)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.coco_Descripcion)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.Property(e => e.coco_Estado)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.coco_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.coco_FechaEliminacion).HasColumnType("datetime");

                entity.Property(e => e.coco_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbCondicionesComercialesusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Acce_tbUsuarios_Adua_tbCondicionesComerciales_coco_UsuarioCreacion");

                entity.HasOne(d => d.usua_UsuarioEliminacionNavigation)
                    .WithMany(p => p.tbCondicionesComercialesusua_UsuarioEliminacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioEliminacion)
                    .HasConstraintName("FK_Acce_tbUsuarios_Adua_tbCondicionesComerciales_coco_usua_UsuarioEliminacion");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbCondicionesComercialesusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Acce_tbUsuarios_Adua_tbCondicionesComerciales_coco_usua_UsuarioModificacion");
            });

            modelBuilder.Entity<tbCondicionesHistorial>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("tbCondicionesHistorial", "Adua");

                entity.Property(e => e.codi_Concepto_Monto_Declarado).HasMaxLength(500);

                entity.Property(e => e.codi_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.codi_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.codi_FechaEliminacion).HasColumnType("datetime");

                entity.Property(e => e.codi_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.codi_Indicar_Canones).HasMaxLength(500);

                entity.Property(e => e.codi_Indicar_Existe_Condicion).HasMaxLength(500);

                entity.Property(e => e.codi_Indicar_Restricciones_Utilizacion).HasMaxLength(500);

                entity.Property(e => e.codi_Tipo_Vinculacion).HasMaxLength(500);

                entity.Property(e => e.hcod_Accion).HasMaxLength(100);

                entity.Property(e => e.hcod_FechaAccion).HasColumnType("datetime");

                entity.Property(e => e.hcod_Id).ValueGeneratedOnAdd();
            });

            modelBuilder.Entity<tbConductor>(entity =>
            {
                entity.HasKey(e => e.cont_Id)
                    .HasName("PK_Adua_tbConductor_cont_Id");

                entity.ToTable("tbConductor", "Adua");

                entity.Property(e => e.cont_Apellido)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.cont_Estado)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.cont_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.cont_FechaEliminacion).HasColumnType("datetime");

                entity.Property(e => e.cont_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.cont_Licencia)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.cont_Nombre)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.HasOne(d => d.pais_IdExpedicionNavigation)
                    .WithMany(p => p.tbConductor)
                    .HasForeignKey(d => d.pais_IdExpedicion)
                    .HasConstraintName("FK_Gral_tbPaises_pais_Id_Adua_tbConductor_pais_IdExpedicion");

                entity.HasOne(d => d.tran)
                    .WithMany(p => p.tbConductor)
                    .HasForeignKey(d => d.tran_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_tbTransporte_tran_Id_Adua_tbConductor_tran_Id");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbConductorusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbConductor_tbUsuarios_cont_UsuCrea");

                entity.HasOne(d => d.usua_UsuarioEliminacionNavigation)
                    .WithMany(p => p.tbConductorusua_UsuarioEliminacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioEliminacion)
                    .HasConstraintName("FK_Prod_tbConductor_Acce_tbUsuarios_usua_UsuarioEliminacion_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbConductorusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Prod_tbConductor_tbUsuarios_cont_UsuModifica");
            });

            modelBuilder.Entity<tbDeclaraciones_Valor>(entity =>
            {
                entity.HasKey(e => e.deva_Id)
                    .HasName("FK_Adua_tbDeclaraciones_Valor_deva_Id");

                entity.ToTable("tbDeclaraciones_Valor", "Adua");

                entity.Property(e => e.deva_ConversionDolares).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.deva_DeclaracionMercancia).HasMaxLength(500);

                entity.Property(e => e.deva_Estado)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.deva_FechaAceptacion).HasColumnType("datetime");

                entity.Property(e => e.deva_FechaContrato).HasColumnType("date");

                entity.Property(e => e.deva_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.deva_FechaExportacion).HasColumnType("date");

                entity.Property(e => e.deva_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.deva_FormaEnvioOtra).HasMaxLength(500);

                entity.Property(e => e.deva_FormaPagoOtra).HasMaxLength(200);

                entity.Property(e => e.deva_LugarEntrega).HasMaxLength(800);

                entity.Property(e => e.deva_NumeroContrato).HasMaxLength(200);

                entity.Property(e => e.inco_Version).HasMaxLength(10);

                entity.Property(e => e.mone_Otra).HasMaxLength(200);

                entity.HasOne(d => d.deva_AduanaDespacho)
                    .WithMany(p => p.tbDeclaraciones_Valordeva_AduanaDespacho)
                    .HasForeignKey(d => d.deva_AduanaDespachoId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_tbDeclaraciones_Valor_deva_AduanaDespachoId_Adua_tbAduanas");

                entity.HasOne(d => d.deva_AduanaIngreso)
                    .WithMany(p => p.tbDeclaraciones_Valordeva_AduanaIngreso)
                    .HasForeignKey(d => d.deva_AduanaIngresoId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_tbDeclaraciones_Valor_deva_AduanaIngresoId_Adua_tbAduanas");

                entity.HasOne(d => d.emba)
                    .WithMany(p => p.tbDeclaraciones_Valor)
                    .HasForeignKey(d => d.emba_Id)
                    .HasConstraintName("FK_Adua_tbDeclaraciones_Valor_emba_Id_Adua_tbLugaresEmbarque_emba_Id");

                entity.HasOne(d => d.foen)
                    .WithMany(p => p.tbDeclaraciones_Valor)
                    .HasForeignKey(d => d.foen_Id)
                    .HasConstraintName("FK_Adua_tbDeclaraciones_Valor_foen_Id_Gral_tbFormas_Envio_foen_Id");

                entity.HasOne(d => d.fopa)
                    .WithMany(p => p.tbDeclaraciones_Valor)
                    .HasForeignKey(d => d.fopa_Id)
                    .HasConstraintName("FK_Adua_tbDeclaraciones_Valor_fopa_Id_Adua_tbFormasdePago_fopa_Id");

                entity.HasOne(d => d.impo)
                    .WithMany(p => p.tbDeclaraciones_Valor)
                    .HasForeignKey(d => d.impo_Id)
                    .HasConstraintName("FK_Adua_tbDeclaraciones_Valor_impo_Id_Adua_tbImportadores");

                entity.HasOne(d => d.inco)
                    .WithMany(p => p.tbDeclaraciones_Valor)
                    .HasForeignKey(d => d.inco_Id)
                    .HasConstraintName("FK_Adua_tbDeclaraciones_Valor_inco_Id_Adua_tbIncoterm");

                entity.HasOne(d => d.inte)
                    .WithMany(p => p.tbDeclaraciones_Valor)
                    .HasForeignKey(d => d.inte_Id)
                    .HasConstraintName("FK_Adua_tbDeclaraciones_Valor_inte_Id_Adua_tbIntermediarios");

                entity.HasOne(d => d.mone)
                    .WithMany(p => p.tbDeclaraciones_Valor)
                    .HasForeignKey(d => d.mone_Id)
                    .HasConstraintName("FK_Adua_tbDeclaraciones_Valor_mone_Id_Gral_tbMonedas_mone_Id");

                entity.HasOne(d => d.pais_Entrega)
                    .WithMany(p => p.tbDeclaraciones_Valorpais_Entrega)
                    .HasForeignKey(d => d.pais_EntregaId)
                    .HasConstraintName("FK_Adua_tbDeclaraciones_Valor_pais_EntregaId_Gral_tbPaises_pais_Id");

                entity.HasOne(d => d.pais_Exportacion)
                    .WithMany(p => p.tbDeclaraciones_Valorpais_Exportacion)
                    .HasForeignKey(d => d.pais_ExportacionId)
                    .HasConstraintName("FK_Adua_tbDeclaraciones_Valor_pais_Exportacion_Id_Gral_tbPaises_pais_Exportacion_Id");

                entity.HasOne(d => d.pvde)
                    .WithMany(p => p.tbDeclaraciones_Valor)
                    .HasForeignKey(d => d.pvde_Id)
                    .HasConstraintName("FK_Adua_tbDeclaraciones_Valor_pvde_Id_Adua_tbProveedoresDeclaracion");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbDeclaraciones_Valorusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .HasConstraintName("FK_Adua_tbDeclaraciones_Valor_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbDeclaraciones_Valorusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Adua_tbDeclaraciones_Valor_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id");
            });

            modelBuilder.Entity<tbDeclaraciones_ValorHistorial>(entity =>
            {
                entity.HasKey(e => e.hdev_Id)
                    .HasName("PK_Adua_tbDeclaraciones_ValorHistorial_hdev_Id");

                entity.ToTable("tbDeclaraciones_ValorHistorial", "Adua");

                entity.Property(e => e.deva_ConversionDolares).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.deva_DeclaracionMercancia).HasMaxLength(500);

                entity.Property(e => e.deva_FechaAceptacion).HasColumnType("datetime");

                entity.Property(e => e.deva_FechaContrato).HasColumnType("date");

                entity.Property(e => e.deva_FechaExportacion).HasColumnType("date");

                entity.Property(e => e.deva_FormaEnvioOtra).HasMaxLength(500);

                entity.Property(e => e.deva_FormaPagoOtra).HasMaxLength(200);

                entity.Property(e => e.deva_LugarEntrega).HasMaxLength(800);

                entity.Property(e => e.deva_NumeroContrato).HasMaxLength(200);

                entity.Property(e => e.hdev_Accion).HasMaxLength(100);

                entity.Property(e => e.hdev_FechaAccion).HasColumnType("datetime");

                entity.Property(e => e.inco_Version).HasMaxLength(10);

                entity.Property(e => e.mone_Otra).HasMaxLength(200);
            });

            modelBuilder.Entity<tbDeclarantes>(entity =>
            {
                entity.HasKey(e => e.decl_Id)
                    .HasName("PK_Adua_tbDeclarantes_decl_Id");

                entity.ToTable("tbDeclarantes", "Adua");

                entity.Property(e => e.decl_Correo_Electronico)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.Property(e => e.decl_Direccion_Exacta)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.decl_Estado)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.decl_Fax).HasMaxLength(50);

                entity.Property(e => e.decl_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.decl_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.decl_Nombre_Raso)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.decl_NumeroIdentificacion).HasMaxLength(50);

                entity.Property(e => e.decl_Telefono)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.HasOne(d => d.ciud)
                    .WithMany(p => p.tbDeclarantes)
                    .HasForeignKey(d => d.ciud_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_tbDeclarantes_esta_Id_Adua_tbCiudades_ciud_Id");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbDeclarantesusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Acce_tbDeclarantes_Adua_tbIncoterm_Valor_fopa_UsuarioCreacion");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbDeclarantesusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Acce_tbDeclarantes_Adua_tbIncoterm_Valor_fopa_usua_UsuarioModificacion");
            });

            modelBuilder.Entity<tbDeclarantesHistorial>(entity =>
            {
                entity.HasKey(e => e.hdec_Id)
                    .HasName("PK_Adua_tbDeclarantesHistorial_hdec_Id");

                entity.ToTable("tbDeclarantesHistorial", "Adua");

                entity.Property(e => e.decl_Correo_Electronico)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.Property(e => e.decl_Direccion_Exacta)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.decl_Fax).HasMaxLength(50);

                entity.Property(e => e.decl_Nombre_Raso)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.decl_NumeroIdentificacion).HasMaxLength(50);

                entity.Property(e => e.decl_Telefono)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.hdec_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.decl)
                    .WithMany(p => p.tbDeclarantesHistorial)
                    .HasForeignKey(d => d.decl_Id)
                    .HasConstraintName("FK_Adua_tbDeclarantesHistorial_tbDeclarantes_decl_Id");
            });

            modelBuilder.Entity<tbDocumentosContratos>(entity =>
            {
                entity.HasKey(e => e.doco_Id)
                    .HasName("PK_Adua_tbDocumentosContratos_doco_Id");

                entity.ToTable("tbDocumentosContratos", "Adua");

                entity.Property(e => e.doco_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.doco_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.doco_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.doco_Numero_O_Referencia)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.doco_TipoDocumento).HasMaxLength(6);

                entity.HasOne(d => d.coin)
                    .WithMany(p => p.tbDocumentosContratos)
                    .HasForeignKey(d => d.coin_Id)
                    .HasConstraintName("FK_Adua_tbDocumentosContratos_tbComercianteIndividual_coin_Id");

                entity.HasOne(d => d.peju)
                    .WithMany(p => p.tbDocumentosContratos)
                    .HasForeignKey(d => d.peju_Id)
                    .HasConstraintName("FK_Adua_tbDocumentosContratos_tbPersonaJuridica_peju_Id");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbDocumentosContratosusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_tbDocumentosContratos_coin_UsuarioCreacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbDocumentosContratosusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Adua_tbDocumentosContratos_coin_UsuarioModificacion_Acce_tbUsuarios_usua_Id");
            });

            modelBuilder.Entity<tbDocumentosDeSoporte>(entity =>
            {
                entity.HasKey(e => e.doso_Id)
                    .HasName("PK_Adua_tbDocumentosDeSoporte_doso_Id");

                entity.ToTable("tbDocumentosDeSoporte", "Adua");

                entity.Property(e => e.doso_EntidadEmitioDocumento).HasMaxLength(75);

                entity.Property(e => e.doso_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.doso_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.doso_FechaEliminacion).HasColumnType("datetime");

                entity.Property(e => e.doso_FechaEmision).HasColumnType("date");

                entity.Property(e => e.doso_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.doso_FechaVencimiento).HasColumnType("date");

                entity.Property(e => e.doso_LineaAplica)
                    .IsRequired()
                    .HasMaxLength(4)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.doso_Monto).HasMaxLength(50);

                entity.Property(e => e.doso_NumeroDocumento)
                    .IsRequired()
                    .HasMaxLength(15);

                entity.Property(e => e.duca_No_Duca)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.HasOne(d => d.duca_No_DucaNavigation)
                    .WithMany(p => p.tbDocumentosDeSoporte)
                    .HasForeignKey(d => d.duca_No_Duca)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_tbDocumentosDeSoporte_Adua_tbDuca_duca_No_Duca");

                entity.HasOne(d => d.tido)
                    .WithMany(p => p.tbDocumentosDeSoporte)
                    .HasForeignKey(d => d.tido_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tbDocumentosDeSoporte_Adua_tbTipoDocumento_tido_Id");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbDocumentosDeSoporteusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_tbDocumentosDeSoporte_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioEliminacionNavigation)
                    .WithMany(p => p.tbDocumentosDeSoporteusua_UsuarioEliminacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioEliminacion)
                    .HasConstraintName("FK_Adua_tbDocumentosDeSoporte_usua_UsuarioEliminacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbDocumentosDeSoporteusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Adua_tbDocumentosDeSoporte_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id");
            });

            modelBuilder.Entity<tbDocumentosPDF>(entity =>
            {
                entity.HasKey(e => e.dpdf_Id)
                    .HasName("PK_Adua_tbDocumentosPDF_dpdf_Id");

                entity.ToTable("tbDocumentosPDF", "Adua");

                entity.Property(e => e.dpdf_Boletin)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.dpdf_CA)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.dpdf_DUCA)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.dpdf_DVA)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.dpdf_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.dpdf_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.dpdf_FechaEliminacion).HasColumnType("datetime");

                entity.Property(e => e.dpdf_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.deva)
                    .WithMany(p => p.tbDocumentosPDF)
                    .HasForeignKey(d => d.deva_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_tbDocumentosPDF_Adua_tbDeclaraciones_Valor_deva_Id");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbDocumentosPDFusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Acce_tbUsuarios_usua_Id_Gral_tbDocumentosPDF_usua_UsuarioCreacion");

                entity.HasOne(d => d.usua_UsuarioEliminacionNavigation)
                    .WithMany(p => p.tbDocumentosPDFusua_UsuarioEliminacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioEliminacion)
                    .HasConstraintName("FK_Adua_tbDocumentosPDF_Acce_tbUsuarios_usua_UsuarioEliminacion_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbDocumentosPDFusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Acce_tbUsuarios_usua_Id_Gral_tbDocumentosPDF_usua_UsuarioModicacion");
            });

            modelBuilder.Entity<tbDocumentosPDFHistorial>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("tbDocumentosPDFHistorial", "Adua");

                entity.Property(e => e.dpdf_Boletin)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.dpdf_CA)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.dpdf_DUCA)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.dpdf_DVA)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.hpdf_Accion).HasMaxLength(100);

                entity.Property(e => e.hpdf_FechaAccion).HasColumnType("datetime");

                entity.Property(e => e.hpdf_Id).ValueGeneratedOnAdd();
            });

            modelBuilder.Entity<tbDuca>(entity =>
            {
                entity.HasKey(e => e.duca_No_Duca)
                    .HasName("PK_Adua_tbDuca_duca_No_Duca");

                entity.ToTable("tbDuca", "Adua");

                entity.Property(e => e.duca_No_Duca).HasMaxLength(100);

                entity.Property(e => e.duca_CanalAsignado)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.duca_Codigo_Declarante).HasMaxLength(200);

                entity.Property(e => e.duca_Codigo_Tipo_Documento)
                    .HasMaxLength(3)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.duca_Codigo_Transportista).HasMaxLength(200);

                entity.Property(e => e.duca_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.duca_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.duca_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.duca_FechaVencimiento).HasColumnType("date");

                entity.Property(e => e.duca_Numero_Id_Declarante).HasMaxLength(200);

                entity.Property(e => e.duca_Numero_Id_Importador).HasMaxLength(100);

                entity.Property(e => e.duca_PesoBrutoTotal).HasColumnType("decimal(20, 8)");

                entity.Property(e => e.duca_PesoNetoTotal).HasColumnType("decimal(20, 8)");

                entity.HasOne(d => d.deva)
                    .WithMany(p => p.tbDuca)
                    .HasForeignKey(d => d.deva_Id)
                    .HasConstraintName("FK_Adua_tbDeclaraciones_Valor_deva_Id_Adua_tbDuca_deva_Id");

                entity.HasOne(d => d.duca_AduanaRegistroNavigation)
                    .WithMany(p => p.tbDucaduca_AduanaRegistroNavigation)
                    .HasForeignKey(d => d.duca_AduanaRegistro)
                    .HasConstraintName("FK_Adua_tbDuca_duca_AduanaRegistro_tbAduana_adua_Id");

                entity.HasOne(d => d.duca_AduanaSalidaNavigation)
                    .WithMany(p => p.tbDucaduca_AduanaSalidaNavigation)
                    .HasForeignKey(d => d.duca_AduanaSalida)
                    .HasConstraintName("FK_Adua_tbDuca_duca_AduanaSalida_tbAduana_adua_Id");

                entity.HasOne(d => d.duca_Conductor)
                    .WithMany(p => p.tbDuca)
                    .HasForeignKey(d => d.duca_Conductor_Id)
                    .HasConstraintName("FK_Adua_tbConductor_cont_Id_Adua_tbDuca_duca_Conductor_Id");

                entity.HasOne(d => d.duca_Pais_DestinoNavigation)
                    .WithMany(p => p.tbDucaduca_Pais_DestinoNavigation)
                    .HasForeignKey(d => d.duca_Pais_Destino)
                    .HasConstraintName("FK_Adua_tbDuca_duca_Pais_Destino_tbPaises_pais_Id");

                entity.HasOne(d => d.duca_Pais_Emision_ExportadorNavigation)
                    .WithMany(p => p.tbDucaduca_Pais_Emision_ExportadorNavigation)
                    .HasForeignKey(d => d.duca_Pais_Emision_Exportador)
                    .HasConstraintName("FK_Adua_tbDuca_duca_Pais_Emision_Exportador_tbPaises_pais_Id");

                entity.HasOne(d => d.duca_Pais_Emision_ImportadorNavigation)
                    .WithMany(p => p.tbDucaduca_Pais_Emision_ImportadorNavigation)
                    .HasForeignKey(d => d.duca_Pais_Emision_Importador)
                    .HasConstraintName("FK_Adua_tbDuca_duca_Pais_Emision_Importador_tbPaises_pais_Id");

                entity.HasOne(d => d.duca_Pais_ExportacionNavigation)
                    .WithMany(p => p.tbDucaduca_Pais_ExportacionNavigation)
                    .HasForeignKey(d => d.duca_Pais_Exportacion)
                    .HasConstraintName("FK_Adua_tbDuca_duca_Pais_Exportacion_tbPaises_pais_Id");

                entity.HasOne(d => d.duca_Pais_ProcedenciaNavigation)
                    .WithMany(p => p.tbDucaduca_Pais_ProcedenciaNavigation)
                    .HasForeignKey(d => d.duca_Pais_Procedencia)
                    .HasConstraintName("FK_Adua_tbDuca_duca_Pais_Procedencia_tbPaises_pais_Id");

                entity.HasOne(d => d.duca_Tipo_Iden_ExportadorNavigation)
                    .WithMany(p => p.tbDuca)
                    .HasForeignKey(d => d.duca_Tipo_Iden_Exportador)
                    .HasConstraintName("FK_Adua_tbDuca_duca_Tipo_Iden_Exportador_tbTiposIdentificacion");

                entity.HasOne(d => d.motr)
                    .WithMany(p => p.tbDuca)
                    .HasForeignKey(d => d.motr_Id)
                    .HasConstraintName("FK_Adua_tbDuca_motr_id_tbModoTransporte_motr_Id");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbDucausua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .HasConstraintName("FK_Adua_tbDuca_tbUsuarios_duca_UsuCrea");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbDucausua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Prod_tbDuca_tbUsuarios_duca_UsuModifica");
            });

            modelBuilder.Entity<tbDucaHistorial>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("tbDucaHistorial", "Adua");

                entity.Property(e => e.duca_Clase).IsRequired();

                entity.Property(e => e.duca_Codigo_Declarante)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.duca_Codigo_Tipo_Documento)
                    .IsRequired()
                    .HasMaxLength(3)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.duca_Codigo_Transportista).HasMaxLength(200);

                entity.Property(e => e.duca_Deposito_Aduanero).IsRequired();

                entity.Property(e => e.duca_DomicilioFiscal_Declarante).IsRequired();

                entity.Property(e => e.duca_DomicilioFiscal_Exportador).IsRequired();

                entity.Property(e => e.duca_DomicilioFiscal_Importador).IsRequired();

                entity.Property(e => e.duca_Lugar_Desembarque).IsRequired();

                entity.Property(e => e.duca_Lugar_Embarque).IsRequired();

                entity.Property(e => e.duca_Manifiesto).IsRequired();

                entity.Property(e => e.duca_Modalidad).IsRequired();

                entity.Property(e => e.duca_No_Correlativo_Referencia).IsRequired();

                entity.Property(e => e.duca_No_Duca).HasMaxLength(100);

                entity.Property(e => e.duca_NombreSocial_Declarante).IsRequired();

                entity.Property(e => e.duca_Numero_Id_Declarante)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.duca_Numero_Id_Importador)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.duca_Regimen_Aduanero).IsRequired();

                entity.Property(e => e.duca_Tipo_Iden_Exportador)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.duca_Titulo).IsRequired();

                entity.Property(e => e.hduc_Accion).HasMaxLength(100);

                entity.Property(e => e.hduc_FechaAccion).HasColumnType("datetime");

                entity.Property(e => e.hduc_Id).ValueGeneratedOnAdd();
            });

            modelBuilder.Entity<tbEmpleados>(entity =>
            {
                entity.HasKey(e => e.empl_Id)
                    .HasName("PK_Adua_tbEmpleados_emad_Id");

                entity.ToTable("tbEmpleados", "Gral");

                entity.HasIndex(e => e.empl_DNI, "UQ_Gral_tbEmpleados_empl_DNI")
                    .IsUnique();

                entity.Property(e => e.empl_Apellidos)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.Property(e => e.empl_CorreoElectronico)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.Property(e => e.empl_DNI)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.empl_DireccionExacta)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(e => e.empl_Estado)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.empl_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.empl_FechaEliminacion).HasColumnType("datetime");

                entity.Property(e => e.empl_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.empl_FechaNacimiento).HasColumnType("date");

                entity.Property(e => e.empl_Nombres)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.Property(e => e.empl_Sexo)
                    .IsRequired()
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.empl_Telefono)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.HasOne(d => d.carg)
                    .WithMany(p => p.tbEmpleados)
                    .HasForeignKey(d => d.carg_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Gral_tbCargos_Adua_tbasEmpleados_carg_Id");

                entity.HasOne(d => d.escv)
                    .WithMany(p => p.tbEmpleados)
                    .HasForeignKey(d => d.escv_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Gral_tbEstadosCiviles_Adua_tbEmpleados_escv_Id");

                entity.HasOne(d => d.pvin)
                    .WithMany(p => p.tbEmpleados)
                    .HasForeignKey(d => d.pvin_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Gral_tbProvincias_Adua_tbEmpleados_pvin_Id");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbEmpleadosusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Acce_tbUsuarios_Gral_tbEmpleados_empl_UsuarioCreacion");

                entity.HasOne(d => d.usua_UsuarioEliminacionNavigation)
                    .WithMany(p => p.tbEmpleadosusua_UsuarioEliminacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioEliminacion)
                    .HasConstraintName("FK_Acce_tbUsuarios_Gral_tbEmpleados_empl_UsuarioEliminacion");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbEmpleadosusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Acce_tbUsuarios_Gral_tbEmpleados_empl_UsuarioModificacion");
            });

            modelBuilder.Entity<tbEstadoBoletin>(entity =>
            {
                entity.HasKey(e => e.esbo_Id)
                    .HasName("PK_Adua_tbEstadoBoletin_esbo_Id");

                entity.ToTable("tbEstadoBoletin", "Adua");

                entity.HasIndex(e => e.esbo_Descripcion, "UQ_Adua_tbEstadoBoletin_esbo_Descripcion")
                    .IsUnique();

                entity.Property(e => e.esbo_Descripcion)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.esbo_Estadoo).HasDefaultValueSql("((1))");

                entity.Property(e => e.esbo_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.esbo_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbEstadoBoletinusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_tbEstadoBoletin_esbo_UsuarioCreacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbEstadoBoletinusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Adua_tbEstadoBoletin_esbo_UsuarioModificacion_Acce_tbUsuarios_usua_Id");
            });

            modelBuilder.Entity<tbEstadoMercancias>(entity =>
            {
                entity.HasKey(e => e.merc_Id)
                    .HasName("PK_Adua_tbEstadoMercancias_merc_Id");

                entity.ToTable("tbEstadoMercancias", "Adua");

                entity.HasIndex(e => e.merc_Codigo, "UQ_Adua_tbEstadoMercancias_merc_Codigo")
                    .IsUnique();

                entity.Property(e => e.merc_Codigo)
                    .HasMaxLength(2)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.merc_Descripcion)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.Property(e => e.merc_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.merc_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.merc_FechaEliminacion).HasColumnType("datetime");

                entity.Property(e => e.merc_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbEstadoMercanciasusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_tbEstadoMercancias_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioEliminacionNavigation)
                    .WithMany(p => p.tbEstadoMercanciasusua_UsuarioEliminacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioEliminacion)
                    .HasConstraintName("FK_Adua_tbEstadoMercancias_usua_UsuarioEliminacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbEstadoMercanciasusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Adua_tbEstadoMercancias_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id");
            });

            modelBuilder.Entity<tbEstadosCiviles>(entity =>
            {
                entity.HasKey(e => e.escv_Id)
                    .HasName("PK_Gral_tbEstadosCiviles_escv_Id");

                entity.ToTable("tbEstadosCiviles", "Gral");

                entity.HasIndex(e => e.escv_Nombre, "UQ_Gral_tbEstadosCiviles_escv_Nombre")
                    .IsUnique();

                entity.Property(e => e.escv_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.escv_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.escv_FechaEliminacion).HasColumnType("datetime");

                entity.Property(e => e.escv_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.escv_Nombre)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbEstadosCivilesusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Gral_tbEstadosCiviles_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioEliminacionNavigation)
                    .WithMany(p => p.tbEstadosCivilesusua_UsuarioEliminacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioEliminacion)
                    .HasConstraintName("FK_Gral_tbEstadosCiviles_usua_UsuarioEliminacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbEstadosCivilesusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Gral_tbEstadosCiviles_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id");
            });

            modelBuilder.Entity<tbEstilos>(entity =>
            {
                entity.HasKey(e => e.esti_Id)
                    .HasName("PK_Prod_tbEstilos_esti_Id");

                entity.ToTable("tbEstilos", "Prod");

                entity.HasIndex(e => e.esti_Descripcion, "UQ_Prod_tbEstilos_esti_Descripcion")
                    .IsUnique();

                entity.Property(e => e.esti_Descripcion)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.esti_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.esti_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.esti_FechaEliminacion).HasColumnType("datetime");

                entity.Property(e => e.esti_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbEstilosusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbEstilos_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioEliminacionNavigation)
                    .WithMany(p => p.tbEstilosusua_UsuarioEliminacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioEliminacion)
                    .HasConstraintName("FK_Prod_tbEstilos_usua_UsuarioEliminacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbEstilosusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Prod_tbEstilos_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id");
            });

            modelBuilder.Entity<tbFacturas>(entity =>
            {
                entity.HasKey(e => e.fact_Id)
                    .HasName("PK_Adua_tbFactura_fact_Id");

                entity.ToTable("tbFacturas", "Adua");

                entity.Property(e => e.fact_Estado)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.fact_Fecha).HasColumnType("date");

                entity.Property(e => e.fact_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.fact_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.fact_Numero)
                    .IsRequired()
                    .HasMaxLength(4000);

                entity.HasOne(d => d.deva)
                    .WithMany(p => p.tbFacturas)
                    .HasForeignKey(d => d.deva_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_tbFacturas_tbDeclaraciones_Valor_deva_Id");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbFacturasusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_tbFacturas_tbUsuarios_fact_UsucCrea");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbFacturasusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Adua_tbFacturas_tbUsuarios_fact_usua_UsuarioModificacion");
            });

            modelBuilder.Entity<tbFacturasExportacion>(entity =>
            {
                entity.HasKey(e => e.faex_Id)
                    .HasName("PK_Prod_tbFacturasExportacion_faex_Id");

                entity.ToTable("tbFacturasExportacion", "Prod");

                entity.Property(e => e.duca_No_Duca)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.faex_Fecha).HasColumnType("datetime");

                entity.Property(e => e.faex_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.faex_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.faex_Total).HasColumnType("decimal(18, 0)");

                entity.HasOne(d => d.duca_No_DucaNavigation)
                    .WithMany(p => p.tbFacturasExportacion)
                    .HasForeignKey(d => d.duca_No_Duca)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbFacturasExportacion_Adua_tbDuca");

                entity.HasOne(d => d.orco)
                    .WithMany(p => p.tbFacturasExportacion)
                    .HasForeignKey(d => d.orco_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbFacturasExportacion_tbOrdenCompra_orco_Id");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbFacturasExportacionusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbFacturasExportacion_Acce_tbUsuarios_usua_UsuarioCreacion");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbFacturasExportacionusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Prod_tbFacturasExportacion_Acce_tbUsuarios_usua_UsuarioModificacion");
            });

            modelBuilder.Entity<tbFacturasExportacionDetalles>(entity =>
            {
                entity.HasKey(e => e.fede_Id)
                    .HasName("PK_Prod_tbFacturasExportacionDetalles_fede_Id");

                entity.ToTable("tbFacturasExportacionDetalles", "Prod");

                entity.Property(e => e.fede_Cantidad).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.fede_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.fede_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.fede_PrecioUnitario).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.fede_TotalDetalle).HasColumnType("decimal(18, 2)");

                entity.HasOne(d => d.code)
                    .WithMany(p => p.tbFacturasExportacionDetalles)
                    .HasForeignKey(d => d.code_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbFacturasExportacionDetalles_tbOrdenCompraDetalles_code_Id");

                entity.HasOne(d => d.faex)
                    .WithMany(p => p.tbFacturasExportacionDetalles)
                    .HasForeignKey(d => d.faex_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbFacturasExportacionDetalles_tbFacturasExportacion_faex_Id");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbFacturasExportacionDetallesusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbFacturasExportacionDetalles_Acce_tbUsuarios_usua_UsuarioCreacion");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbFacturasExportacionDetallesusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Prod_tbFacturasExportacionDetalles_Acce_tbUsuarios_usua_UsuarioModificacion");
            });

            modelBuilder.Entity<tbFacturasHistorial>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("tbFacturasHistorial", "Adua");

                entity.Property(e => e.fact_Numero)
                    .IsRequired()
                    .HasMaxLength(4000);

                entity.Property(e => e.fect_Fecha).HasColumnType("datetime");

                entity.Property(e => e.hfact_Accion).HasMaxLength(100);

                entity.Property(e => e.hfact_FechaAccion).HasColumnType("datetime");

                entity.Property(e => e.hfact_Id).ValueGeneratedOnAdd();
            });

            modelBuilder.Entity<tbFormas_Envio>(entity =>
            {
                entity.HasKey(e => e.foen_Id)
                    .HasName("PK_Gral_tbFormas_Envio_foen_Id");

                entity.ToTable("tbFormas_Envio", "Gral");

                entity.HasIndex(e => e.foen_Codigo, "UQ_Gral_tbFormas_Envio_foen_Codigo")
                    .IsUnique();

                entity.HasIndex(e => e.foen_Descripcion, "UQ_Gral_tbFormas_Envio_foen_Descripcion")
                    .IsUnique();

                entity.Property(e => e.foen_Codigo)
                    .HasMaxLength(2)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.foen_Descripcion).HasMaxLength(500);

                entity.Property(e => e.foen_Estado)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.foen_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.foen_FechaEliminacion).HasColumnType("datetime");

                entity.Property(e => e.foen_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbFormas_Enviousua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Gral_tbFormas_Envio_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioEliminacionNavigation)
                    .WithMany(p => p.tbFormas_Enviousua_UsuarioEliminacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioEliminacion)
                    .HasConstraintName("FK_Gral_tbFormas_Envio_usua_UsuarioEliminacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbFormas_Enviousua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Gral_tbFormas_Envio_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id");
            });

            modelBuilder.Entity<tbFormasdePago>(entity =>
            {
                entity.HasKey(e => e.fopa_Id)
                    .HasName("PK_Adua_tbFormasdePago_fopa_Id");

                entity.ToTable("tbFormasdePago", "Adua");

                entity.HasIndex(e => e.fopa_Descripcion, "UQ_Adua_tbFormasdePago_fopa_Descripcion")
                    .IsUnique();

                entity.Property(e => e.fopa_Descripcion)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.Property(e => e.fopa_Estado)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.fopa_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.fopa_FechaEliminacion).HasColumnType("datetime");

                entity.Property(e => e.fopa_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbFormasdePagousua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Acce_tbFormasdePago_Adua_tbIncoterm_Valor_fopa_UsuarioCreacion");

                entity.HasOne(d => d.usua_UsuarioEliminacionNavigation)
                    .WithMany(p => p.tbFormasdePagousua_UsuarioEliminacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioEliminacion)
                    .HasConstraintName("FK_Acce_tbFormasdePago_Adua_tbIncoterm_Valor_fopa_usua_UsuarioEliminacion");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbFormasdePagousua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Acce_tbFormasdePago_Adua_tbIncoterm_Valor_fopa_usua_UsuarioModificacion");
            });

            modelBuilder.Entity<tbFuncionesMaquina>(entity =>
            {
                entity.HasKey(e => e.func_Id)
                    .HasName("PK_Prod_tbFuncionesMaquina_func_Id");

                entity.ToTable("tbFuncionesMaquina", "Prod");

                entity.Property(e => e.func_Estado)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.func_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.func_FechaEliminacion).HasColumnType("datetime");

                entity.Property(e => e.func_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.func_Nombre)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbFuncionesMaquinausua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbFuncionesMaquina_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioEliminacionNavigation)
                    .WithMany(p => p.tbFuncionesMaquinausua_UsuarioEliminacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioEliminacion)
                    .HasConstraintName("FK_Prod_tbFuncionesMaquina_usua_UsuarioEliminacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbFuncionesMaquinausua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Prod_tbFuncionesMaquina_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id");
            });

            modelBuilder.Entity<tbImportadores>(entity =>
            {
                entity.HasKey(e => e.impo_Id)
                    .HasName("PK_Adua_tbImportadores_impo_Id");

                entity.ToTable("tbImportadores", "Adua");

                entity.Property(e => e.impo_Estado)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.impo_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.impo_FechaEliminacion).HasColumnType("datetime");

                entity.Property(e => e.impo_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.impo_NivelComercial_Otro).HasMaxLength(300);

                entity.Property(e => e.impo_NumRegistro)
                    .IsRequired()
                    .HasMaxLength(40);

                entity.Property(e => e.impo_RTN)
                    .IsRequired()
                    .HasMaxLength(40);

                entity.HasOne(d => d.decl)
                    .WithMany(p => p.tbImportadores)
                    .HasForeignKey(d => d.decl_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_tbImportadores_decl_Id_Adua_tbDeclarantes_decl_Id");

                entity.HasOne(d => d.nico)
                    .WithMany(p => p.tbImportadores)
                    .HasForeignKey(d => d.nico_Id)
                    .HasConstraintName("FK_Adua_tbImportadores_nico_Id_Adua_tbNivelesComerciales_nico_Id");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbImportadoresusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Acce_tbImportadores_Adua_tbIncoterm_Valor_impo_UsuarioCreacion");

                entity.HasOne(d => d.usua_UsuarioEliminacionNavigation)
                    .WithMany(p => p.tbImportadoresusua_UsuarioEliminacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioEliminacion)
                    .HasConstraintName("FK_Acce_tbImportadores_Adua_tbIncoterm_Valor_impo_usua_UsuarioEliminacion");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbImportadoresusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Acce_tbImportadores_Adua_tbIncoterm_Valor_impo_usua_UsuarioModificacion");
            });

            modelBuilder.Entity<tbImportadoresHistorial>(entity =>
            {
                entity.HasKey(e => e.himp_Id)
                    .HasName("PK_Adua_tbImportadoresHistorial_himp_Id");

                entity.ToTable("tbImportadoresHistorial", "Adua");

                entity.Property(e => e.himp_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.impo_NivelComercial_Otro).HasMaxLength(300);

                entity.Property(e => e.impo_NumRegistro)
                    .IsRequired()
                    .HasMaxLength(40);

                entity.Property(e => e.impo_RTN)
                    .IsRequired()
                    .HasMaxLength(40);

                entity.HasOne(d => d.impo)
                    .WithMany(p => p.tbImportadoresHistorial)
                    .HasForeignKey(d => d.impo_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_tbImportadoresHistorial_tbImportadores_impo_Id");
            });

            modelBuilder.Entity<tbImpuestos>(entity =>
            {
                entity.HasKey(e => e.impu_Id)
                    .HasName("PK_Adua_tbImpuestos_impu_Id");

                entity.ToTable("tbImpuestos", "Adua");

                entity.Property(e => e.aran_Codigo)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.impu_Descripcion)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.Property(e => e.impu_Estado)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.impu_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.impu_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.impu_Impuesto).HasColumnType("decimal(18, 2)");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbImpuestosusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_tbImpuestos_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbImpuestosusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Adua_tbImpuestos_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id");
            });

            modelBuilder.Entity<tbImpuestosPorArancel>(entity =>
            {
                entity.HasKey(e => e.imar_Id)
                    .HasName("PK_Adua_tbImpuestosPorArancel_imar_Id");

                entity.ToTable("tbImpuestosPorArancel", "Adua");

                entity.Property(e => e.imar_Estado)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.imar_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.imar_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.aran)
                    .WithMany(p => p.tbImpuestosPorArancel)
                    .HasForeignKey(d => d.aran_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_tbImpuestoPorArancel_aran_Id_Adua_tbAranceles_aran_Id");

                entity.HasOne(d => d.impu)
                    .WithMany(p => p.tbImpuestosPorArancel)
                    .HasForeignKey(d => d.impu_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_tbImpuestoPorArancel_imar_Id_Adua_tbImpuesto_impu_Id");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbImpuestosPorArancelusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_tbImpuestosPorArancel_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbImpuestosPorArancelusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Adua_tbImpuestosPorArancel_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id");
            });

            modelBuilder.Entity<tbIncoterm>(entity =>
            {
                entity.HasKey(e => e.inco_Id)
                    .HasName("PK_Adua_tbIncoterm_inco_Id");

                entity.ToTable("tbIncoterm", "Adua");

                entity.HasIndex(e => e.inco_Codigo, "UQ_Adua_tbIncoterm_inco_Codigo")
                    .IsUnique();

                entity.HasIndex(e => e.inco_Descripcion, "UQ_Adua_tbIncoterm_inco_Descripcion")
                    .IsUnique();

                entity.Property(e => e.inco_Codigo)
                    .HasMaxLength(3)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.inco_Descripcion)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.Property(e => e.inco_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.inco_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.inco_FechaEliminacion).HasColumnType("datetime");

                entity.Property(e => e.inco_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbIncotermusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_tbIncoterm_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioEliminacionNavigation)
                    .WithMany(p => p.tbIncotermusua_UsuarioEliminacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioEliminacion)
                    .HasConstraintName("FK_Adua_tbIncoterm_usua_UsuarioEliminacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbIncotermusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Adua_tbIncoterm_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id");
            });

            modelBuilder.Entity<tbIntermediarios>(entity =>
            {
                entity.HasKey(e => e.inte_Id)
                    .HasName("PK_Adua_tbIntermediarios_inte_Id");

                entity.ToTable("tbIntermediarios", "Adua");

                entity.Property(e => e.inte_Estado)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.inte_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.inte_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.inte_Tipo_Otro).HasMaxLength(30);

                entity.HasOne(d => d.decl)
                    .WithMany(p => p.tbIntermediarios)
                    .HasForeignKey(d => d.decl_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_tbIntermediarios_decl_Id_Adua_tbDeclarantes_decl_Id");

                entity.HasOne(d => d.tite)
                    .WithMany(p => p.tbIntermediarios)
                    .HasForeignKey(d => d.tite_Id)
                    .HasConstraintName("FK_Adua_tbIntermediarios_tite_Id_Adua_tbTipoIntermediario_tite_Id");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbIntermediariosusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Acce_tbUsuarios_Adua_tbIntermediarios_inte_UsuarioCreacion");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbIntermediariosusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Acce_tbUsuarios_Adua_tbIntermediarios_inte_usua_UsuarioModificacion");
            });

            modelBuilder.Entity<tbIntermediariosHistorial>(entity =>
            {
                entity.HasKey(e => e.hint_Id)
                    .HasName("PK_Adua_tbIntermediariosHistorial_hint_Id");

                entity.ToTable("tbIntermediariosHistorial", "Adua");

                entity.Property(e => e.himp_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.inte_Tipo_Otro).HasMaxLength(30);

                entity.HasOne(d => d.inte)
                    .WithMany(p => p.tbIntermediariosHistorial)
                    .HasForeignKey(d => d.inte_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_tbIntermediariosHistorial_tbIntermediarios_inte_Id");
            });

            modelBuilder.Entity<tbItems>(entity =>
            {
                entity.HasKey(e => e.item_Id)
                    .HasName("PK_Adua_tbItems_item_Id");

                entity.ToTable("tbItems", "Adua");

                entity.Property(e => e.item_CaracteristicasMercancias)
                    .IsRequired()
                    .HasMaxLength(400);

                entity.Property(e => e.item_ClasificacionArancelaria)
                    .HasMaxLength(16)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.item_CuotaContingente).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.item_Estado)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.item_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.item_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.item_GastosDeTransporte).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.item_IdentificacionComercialMercancias)
                    .IsRequired()
                    .HasMaxLength(300);

                entity.Property(e => e.item_Marca)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.item_Modelo)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.item_OtrosGastos).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.item_PesoBruto).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.item_PesoNeto).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.item_Seguro).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.item_ValorAduana).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.item_ValorTransaccion).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.item_ValorUnitario).HasColumnType("decimal(18, 2)");

                entity.HasOne(d => d.fact)
                    .WithMany(p => p.tbItems)
                    .HasForeignKey(d => d.fact_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("PK_Adua_tbItems_Adua_tbFactura_fact_Id");

                entity.HasOne(d => d.merc)
                    .WithMany(p => p.tbItems)
                    .HasForeignKey(d => d.merc_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_tbItems_merc_Id_Adua_tbMercancias_merc_Id");

                entity.HasOne(d => d.pais_IdOrigenMercanciaNavigation)
                    .WithMany(p => p.tbItems)
                    .HasForeignKey(d => d.pais_IdOrigenMercancia)
                    .HasConstraintName("FK_Adua_tbItems_pais_IdOrigenMercancia_Adua_tbPais_pais_Id");

                entity.HasOne(d => d.unme)
                    .WithMany(p => p.tbItems)
                    .HasForeignKey(d => d.unme_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_tbItems_unme_Id_Adua_tbUnidadesdeMedida_unme_Id");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbItemsusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_tbItems_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbItemsusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Adua_tbItems_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id");
            });

            modelBuilder.Entity<tbItemsHistorial>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("tbItemsHistorial", "Adua");

                entity.Property(e => e.hduc_Accion).HasMaxLength(100);

                entity.Property(e => e.hduc_FechaAccion).HasColumnType("datetime");

                entity.Property(e => e.hite_Id).ValueGeneratedOnAdd();

                entity.Property(e => e.item_CaracteristicasMercancias).HasMaxLength(400);

                entity.Property(e => e.item_ClasificacionArancelaria)
                    .HasMaxLength(16)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.item_CuotaContingente).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.item_GastosDeTransporte).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.item_IdentificacionComercialMercancias).HasMaxLength(300);

                entity.Property(e => e.item_Marca).HasMaxLength(50);

                entity.Property(e => e.item_Modelo).HasMaxLength(100);

                entity.Property(e => e.item_OtrosGastos).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.item_PesoBruto).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.item_PesoNeto).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.item_Seguro).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.item_ValorAduana).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.item_ValorTransaccion).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.item_ValorUnitario).HasColumnType("decimal(18, 2)");
            });

            modelBuilder.Entity<tbLiquidacionGeneral>(entity =>
            {
                entity.HasKey(e => e.lige_Id)
                    .HasName("PK_Adua_tbLiquidacionGeneral_lige_Id");

                entity.ToTable("tbLiquidacionGeneral", "Adua");

                entity.Property(e => e.duca_Id)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.lige_ModalidadPago)
                    .IsRequired()
                    .HasMaxLength(55);

                entity.Property(e => e.lige_TipoTributo)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.lige_TotalGral).HasMaxLength(50);

                entity.Property(e => e.lige_TotalPorTributo)
                    .IsRequired()
                    .HasMaxLength(25);

                entity.HasOne(d => d.duca)
                    .WithMany(p => p.tbLiquidacionGeneral)
                    .HasForeignKey(d => d.duca_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_tbDuca_duca_Id_Adua_tbLiquidacionGeneral_duca_Id");
            });

            modelBuilder.Entity<tbLiquidacionGeneralHistorial>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("tbLiquidacionGeneralHistorial", "Adua");

                entity.Property(e => e.duca_Id).HasMaxLength(100);

                entity.Property(e => e.hlig_Accion).HasMaxLength(100);

                entity.Property(e => e.hlig_FechaAccion).HasColumnType("datetime");

                entity.Property(e => e.hlig_Id).ValueGeneratedOnAdd();

                entity.Property(e => e.lige_ModalidadPago).HasMaxLength(55);

                entity.Property(e => e.lige_TipoTributo).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.lige_TotalGral).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.lige_TotalPorTributo).HasMaxLength(25);
            });

            modelBuilder.Entity<tbLiquidacionPorLinea>(entity =>
            {
                entity.HasKey(e => e.lili_Id)
                    .HasName("PK_Adua_tbLiquidacionPorLinea_lili_Id");

                entity.ToTable("tbLiquidacionPorLinea", "Adua");

                entity.Property(e => e.lili_Alicuota).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.lili_ModalidadPago).HasMaxLength(150);

                entity.Property(e => e.lili_Tipo).HasMaxLength(100);

                entity.Property(e => e.lili_Total).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.lili_TotalGral).HasColumnType("decimal(18, 2)");

                entity.HasOne(d => d.item)
                    .WithMany(p => p.tbLiquidacionPorLinea)
                    .HasForeignKey(d => d.item_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_tbItems_item_Id_tbLiquidacionPorLinea_item_Id");
            });

            modelBuilder.Entity<tbLotes>(entity =>
            {
                entity.HasKey(e => e.lote_Id)
                    .HasName("PK_Prod_tbLotes_lote_Id");

                entity.ToTable("tbLotes", "Prod");

                entity.Property(e => e.lote_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.lote_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.lote_FechaEliminacion).HasColumnType("datetime");

                entity.Property(e => e.lote_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.lote_Observaciones).HasMaxLength(500);

                entity.HasOne(d => d.code)
                    .WithMany(p => p.tbLotes)
                    .HasForeignKey(d => d.code_Id)
                    .HasConstraintName("FK_Prod_tbLotes_Prod_tbOrdenCompraDetalles_code_Id");

                entity.HasOne(d => d.mate)
                    .WithMany(p => p.tbLotes)
                    .HasForeignKey(d => d.mate_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbLotes_mate_Id_Prod_tbMateriales_mate_Id");

                entity.HasOne(d => d.tipa)
                    .WithMany(p => p.tbLotes)
                    .HasForeignKey(d => d.tipa_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbLotes_tipa_Id_Prod_tbTipoArea_tipa_Id");

                entity.HasOne(d => d.unme)
                    .WithMany(p => p.tbLotes)
                    .HasForeignKey(d => d.unme_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbLotes_unme_Id_Gral_tbUnidadMedidas_unme_Id");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbLotesusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbLotes_tbUsuarios_lote_UsuCrea");

                entity.HasOne(d => d.usua_UsuarioEliminacionNavigation)
                    .WithMany(p => p.tbLotesusua_UsuarioEliminacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioEliminacion)
                    .HasConstraintName("FK_Prod_tbLotes_Acce_tbUsuarios_usua_UsuarioEliminacion_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbLotesusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Prod_tbLotes_tbUsuarios_lote_UsuModifica");
            });

            modelBuilder.Entity<tbLugaresEmbarque>(entity =>
            {
                entity.HasKey(e => e.emba_Id)
                    .HasName("PK_Adua_tbLugaresEmbarque_emba_Id");

                entity.ToTable("tbLugaresEmbarque", "Adua");

                entity.HasIndex(e => e.emba_Codigo, "UQ_Adua_tbLugaresEmbarque_prov_emba_Codigo")
                    .IsUnique();

                entity.Property(e => e.emba_Codigo)
                    .HasMaxLength(5)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.emba_Descripcion).HasMaxLength(200);

                entity.Property(e => e.emba_Estado)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.emba_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.emba_FechaEliminacion).HasColumnType("datetime");

                entity.Property(e => e.emba_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbLugaresEmbarqueusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_tbLugaresEmbarque_tbUsuarios_prov_UsuarioCreacion");

                entity.HasOne(d => d.usua_UsuarioEliminacionNavigation)
                    .WithMany(p => p.tbLugaresEmbarqueusua_UsuarioEliminacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioEliminacion)
                    .HasConstraintName("FK_Adua_tbLugaresEmbarque_tbUsuarios_prov_usua_UsuarioEliminacion");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbLugaresEmbarqueusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Adua_tbLugaresEmbarque_tbUsuarios_prov_usua_UsuarioModificacion");
            });

            modelBuilder.Entity<tbMaquinaHistorial>(entity =>
            {
                entity.HasKey(e => e.mahi_Id)
                    .HasName("PK_Prod_tbMaquinaHistorial_mahi_Id");

                entity.ToTable("tbMaquinaHistorial", "Prod");

                entity.Property(e => e.mahi_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.mahi_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.mahi_FechaEliminacion).HasColumnType("datetime");

                entity.Property(e => e.mahi_FechaFin).HasColumnType("datetime");

                entity.Property(e => e.mahi_FechaInicio).HasColumnType("datetime");

                entity.Property(e => e.mahi_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.mahi_Observaciones)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.HasOne(d => d.maqu)
                    .WithMany(p => p.tbMaquinaHistorial)
                    .HasForeignKey(d => d.maqu_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbMaquinaHistorial_Prod_tbMaquinas_maqu_Id");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbMaquinaHistorialusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbMaquinaHistorial_tbUsuarios_mahi_UsuaCrea");

                entity.HasOne(d => d.usua_UsuarioEliminacionNavigation)
                    .WithMany(p => p.tbMaquinaHistorialusua_UsuarioEliminacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioEliminacion)
                    .HasConstraintName("FK_Prod_tbMaquinaHistorial_Acce_tbUsuarios_usua_UsuarioEliminacion_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbMaquinaHistorialusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Prod_tbMaquinaHistorial_tbUsuarios_mahi_UsuModificacion");
            });

            modelBuilder.Entity<tbMaquinas>(entity =>
            {
                entity.HasKey(e => e.maqu_Id)
                    .HasName("PK_Prod_tbMaquinas_maqu_Id");

                entity.ToTable("tbMaquinas", "Prod");

                entity.Property(e => e.maqu_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.maqu_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.maqu_FechaEliminacion).HasColumnType("datetime");

                entity.Property(e => e.maqu_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.maqu_NumeroSerie).HasMaxLength(100);

                entity.HasOne(d => d.mmaq)
                    .WithMany(p => p.tbMaquinas)
                    .HasForeignKey(d => d.mmaq_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbMaquinas_Prod_tbModelosMaquina_mmaq_Id");

                entity.HasOne(d => d.modu)
                    .WithMany(p => p.tbMaquinas)
                    .HasForeignKey(d => d.modu_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbMaquinas_Prod_tbModulos_modu_Id");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbMaquinasusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbMaquinas_usua_UsuarioCreacion_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioEliminacionNavigation)
                    .WithMany(p => p.tbMaquinasusua_UsuarioEliminacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioEliminacion)
                    .HasConstraintName("FK_Prod_tbMaquinas_usua_UsuarioEliminacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbMaquinasusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Prod_tbMaquinas_usua_UsuarioModificacion_tbUsuarios_usua_Id");
            });

            modelBuilder.Entity<tbMarcas>(entity =>
            {
                entity.HasKey(e => e.marc_Id)
                    .HasName("PK_Adua_tbMarcas_marc_Id");

                entity.ToTable("tbMarcas", "Adua");

                entity.HasIndex(e => e.marc_Descripcion, "UQ_Adua_tbMarcas_marc_Descripcion")
                    .IsUnique();

                entity.Property(e => e.marc_Descripcion)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.marc_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.marc_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.marc_FechaEliminacion).HasColumnType("datetime");

                entity.Property(e => e.marc_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbMarcasusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbMarcas_tbUsuarios_marc_UsuarioCreacion");

                entity.HasOne(d => d.usua_UsuarioEliminacionNavigation)
                    .WithMany(p => p.tbMarcasusua_UsuarioEliminacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioEliminacion)
                    .HasConstraintName("FK_Prod_tbMarcas_Acce_tbUsuarios_usua_UsuarioEliminacion_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbMarcasusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Prod_tbMarcas_tbUsuarios_marc_UsuarioModificacion");
            });

            modelBuilder.Entity<tbMarcasMaquina>(entity =>
            {
                entity.HasKey(e => e.marq_Id)
                    .HasName("PK_Prod_tbMarcasMaquina_marq_Id");

                entity.ToTable("tbMarcasMaquina", "Prod");

                entity.HasIndex(e => e.marq_Nombre, "UQ_Prod_tbMarcasMaquina_marq_Nombre")
                    .IsUnique();

                entity.Property(e => e.marq_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.marq_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.marq_FechaEliminacion).HasColumnType("datetime");

                entity.Property(e => e.marq_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.marq_Nombre)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbMarcasMaquinausua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbMarcasMaquina_usua_UsuarioCreacion_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioEliminacionNavigation)
                    .WithMany(p => p.tbMarcasMaquinausua_UsuarioEliminacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioEliminacion)
                    .HasConstraintName("FK_Prod_tbMarcasMaquina_usua_UsuarioEliminacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbMarcasMaquinausua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Prod_tbMarcasMaquina_usua_UsuarioModificacion_tbUsuarios_usua_Id");
            });

            modelBuilder.Entity<tbMateriales>(entity =>
            {
                entity.HasKey(e => e.mate_Id)
                    .HasName("PK_Prod_tbMateriales_mate_Id");

                entity.ToTable("tbMateriales", "Prod");

                entity.Property(e => e.mate_Descripcion).HasMaxLength(200);

                entity.Property(e => e.mate_Estado)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.mate_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.mate_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.mate_Precio).HasColumnType("decimal(18, 2)");

                entity.HasOne(d => d.subc)
                    .WithMany(p => p.tbMateriales)
                    .HasForeignKey(d => d.subc_Id)
                    .HasConstraintName("FK_Prod_tbMateriales_subc_Id_Prod_tbSubcategoria_subc_Id");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbMaterialesusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbMateriales_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbMaterialesusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Prod_tbMateriales_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id");
            });

            modelBuilder.Entity<tbMaterialesBrindar>(entity =>
            {
                entity.HasKey(e => e.mabr_Id)
                    .HasName("PK_Prod_tbMaterialesBrindar_mabr_Id");

                entity.ToTable("tbMaterialesBrindar", "Prod");

                entity.Property(e => e.mabr_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.mabr_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.mabr_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.code)
                    .WithMany(p => p.tbMaterialesBrindar)
                    .HasForeignKey(d => d.code_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbtbMaterialesBrindar_code_Id_Prod_tbOrdenCompraDetalles_code_Id");

                entity.HasOne(d => d.mate)
                    .WithMany(p => p.tbMaterialesBrindar)
                    .HasForeignKey(d => d.mate_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbOrdenCompraDetalles_mate_Id_Prod_tbMateriales_mate_Id");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbMaterialesBrindarusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbMaterialesBrindar_mabr_UsuarioCreacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbMaterialesBrindarusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Prod_tbMaterialesBrindar_mabr_UsuarioModificacion_Acce_tbUsuarios_code_usua_Id");
            });

            modelBuilder.Entity<tbModelosMaquina>(entity =>
            {
                entity.HasKey(e => e.mmaq_Id)
                    .HasName("PK_Prod_tbModelosMaquina_mmaq_Id");

                entity.ToTable("tbModelosMaquina", "Prod");

                entity.Property(e => e.mmaq_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.mmaq_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.mmaq_FechaEliminacion).HasColumnType("datetime");

                entity.Property(e => e.mmaq_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.mmaq_Imagen).IsRequired();

                entity.Property(e => e.mmaq_Nombre)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.HasOne(d => d.func)
                    .WithMany(p => p.tbModelosMaquina)
                    .HasForeignKey(d => d.func_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbModelosMaquina_func_Id_Prod_tbFunciones_func_Id");

                entity.HasOne(d => d.marq)
                    .WithMany(p => p.tbModelosMaquina)
                    .HasForeignKey(d => d.marq_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbModelosMaquina_marq_Id_Prod_tbMarcasMaquina_marq_Id");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbModelosMaquinausua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbModelosMaquina_usua_UsuaCreaciaon_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioEliminacionNavigation)
                    .WithMany(p => p.tbModelosMaquinausua_UsuarioEliminacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioEliminacion)
                    .HasConstraintName("FK_Prod_tbModelosMaquina_usua_UsuarioEliminacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbModelosMaquinausua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Prod_tbModelosMaquina_usua_UsuaModificacion_Acce_tbUsuarios_usua_Id");
            });

            modelBuilder.Entity<tbModoTransporte>(entity =>
            {
                entity.HasKey(e => e.motr_Id)
                    .HasName("PK_Adua_tbModoTransporte_motr_Id");

                entity.ToTable("tbModoTransporte", "Adua");

                entity.HasIndex(e => e.motr_Descripcion, "UQ_Adua_tbModoTransporte_iden_Descripcion")
                    .IsUnique();

                entity.Property(e => e.motr_Descripcion)
                    .IsRequired()
                    .HasMaxLength(75);

                entity.Property(e => e.motr_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.motr_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.motr_FechaEliminacion).HasColumnType("datetime");

                entity.Property(e => e.motr_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbModoTransporteusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbModoTransporte_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioEliminacionNavigation)
                    .WithMany(p => p.tbModoTransporteusua_UsuarioEliminacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioEliminacion)
                    .HasConstraintName("FK_Prod_tbModoTransporte__Acce_tbUsuarios_usua_UsuarioEliminacion_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbModoTransporteusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Prod_tbModoTransporte_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id");
            });

            modelBuilder.Entity<tbModulos>(entity =>
            {
                entity.HasKey(e => e.modu_Id)
                    .HasName("PK_Prod_tbModulos_modu_Id");

                entity.ToTable("tbModulos", "Prod");

                entity.Property(e => e.modu_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.modu_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.modu_FechaEliminacion).HasColumnType("datetime");

                entity.Property(e => e.modu_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.modu_Nombre)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.HasOne(d => d.empr)
                    .WithMany(p => p.tbModulos)
                    .HasForeignKey(d => d.empr_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbModulos_empr_Id_Gral_tbEmpleados_empe_IdSupervisor");

                entity.HasOne(d => d.proc)
                    .WithMany(p => p.tbModulos)
                    .HasForeignKey(d => d.proc_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbModulos_proc_Id_Prod_tbProcesos_proc_Id");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbModulosusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbModulos_modu_UsuarioCreacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioEliminacionNavigation)
                    .WithMany(p => p.tbModulosusua_UsuarioEliminacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioEliminacion)
                    .HasConstraintName("FK_Prod_tbModulos_Acce_tbUsuarios_usua_UsuarioEliminacion_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbModulosusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Prod_tbModulos_modu_UsuarioModificacion_Acce_tbUsuarios_usua_Id");
            });

            modelBuilder.Entity<tbMonedas>(entity =>
            {
                entity.HasKey(e => e.mone_Id)
                    .HasName("PK_Gral_tbMonedas_mone_Id");

                entity.ToTable("tbMonedas", "Gral");

                entity.HasIndex(e => e.mone_Codigo, "UQ_Gral_tbMonedas_mone_Codigo")
                    .IsUnique();

                entity.HasIndex(e => e.mone_Descripcion, "UQ_Gral_tbMonedas_mone_Descripcion")
                    .IsUnique();

                entity.Property(e => e.mone_Codigo)
                    .HasMaxLength(3)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.mone_Descripcion).HasMaxLength(500);

                entity.Property(e => e.mone_Estado)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.mone_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.mone_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbMonedasusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Gral_tbMonedas_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbMonedasusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Gral_tbMonedas_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id");
            });

            modelBuilder.Entity<tbNivelesComerciales>(entity =>
            {
                entity.HasKey(e => e.nico_Id)
                    .HasName("PK_Adua_tbNivelesComerciales_nico_Id");

                entity.ToTable("tbNivelesComerciales", "Adua");

                entity.HasIndex(e => e.nico_Descripcion, "UQ_Adua_tbNivelesComerciales_nico_Descripcion")
                    .IsUnique();

                entity.Property(e => e.nico_Codigo)
                    .IsRequired()
                    .HasMaxLength(3)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.nico_Descripcion)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.Property(e => e.nico_Estado)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.nico_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.nico_FechaEliminacion).HasColumnType("datetime");

                entity.Property(e => e.nico_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbNivelesComercialesusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Acce_tbUsuarios_Adua_tbNivelesComerciales_nico_UsuarioCreacion");

                entity.HasOne(d => d.usua_UsuarioEliminacionNavigation)
                    .WithMany(p => p.tbNivelesComercialesusua_UsuarioEliminacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioEliminacion)
                    .HasConstraintName("FK_Acce_tbUsuarios_Adua_tbNivelesComerciales_nico_usua_UsuarioEliminacion");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbNivelesComercialesusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Acce_tbUsuarios_Adua_tbNivelesComerciales_nico_usua_UsuarioModificacion");
            });

            modelBuilder.Entity<tbOficinas>(entity =>
            {
                entity.HasKey(e => e.ofic_Id)
                    .HasName("PK_Gral_tbOficinas_ofic_Id");

                entity.ToTable("tbOficinas", "Gral");

                entity.HasIndex(e => e.ofic_Nombre, "UQ_Gral_tbOficinas_ofic_Nombre")
                    .IsUnique();

                entity.Property(e => e.ofic_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.ofic_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.ofic_FechaEliminacion).HasColumnType("datetime");

                entity.Property(e => e.ofic_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.ofic_Nombre)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbOficinasusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Gral_tbOficinas_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioEliminacionNavigation)
                    .WithMany(p => p.tbOficinasusua_UsuarioEliminacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioEliminacion)
                    .HasConstraintName("FK_Gral_tbOficinas_usua_UsuarioEliminacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbOficinasusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Gral_tbOficinas_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id");
            });

            modelBuilder.Entity<tbOficio_Profesiones>(entity =>
            {
                entity.HasKey(e => e.ofpr_Id)
                    .HasName("PK_Gral_tbOficinasProfesiones_ofpr_Id");

                entity.ToTable("tbOficio_Profesiones", "Gral");

                entity.HasIndex(e => e.ofpr_Nombre, "UQ_Gral_tbOficinasProfesiones_ofpr_Nombre")
                    .IsUnique();

                entity.Property(e => e.ofpr_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.ofpr_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.ofpr_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.ofpr_Nombre)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbOficio_Profesionesusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Gral_tbOficio_Profesiones_ofpr_UsuarioCreacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbOficio_Profesionesusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Gral_tbOficio_Profesiones_ofpr_UsuarioModificacion_Acce_tbUsuarios_usua_Id");
            });

            modelBuilder.Entity<tbOrde_Ensa_Acab_Etiq>(entity =>
            {
                entity.HasKey(e => e.ensa_Id)
                    .HasName("PK_Prod_tbOrdenCorte_Ensamblado_Acabado_Etiquetado_orde_Id");

                entity.ToTable("tbOrde_Ensa_Acab_Etiq", "Prod");

                entity.Property(e => e.ensa_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.ensa_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.ensa_FechaInicio).HasColumnType("date");

                entity.Property(e => e.ensa_FechaLimite).HasColumnType("date");

                entity.Property(e => e.ensa_FechaModificacion).HasColumnType("datetime");

                //entity.Property(e => e.ensa_MesaCorte).HasMaxLength(150);

                //entity.Property(e => e.ensa_ModuloLineaAsignada).HasMaxLength(150);

                entity.HasOne(d => d.code)
                    .WithMany(p => p.tbOrde_Ensa_Acab_Etiq)
                    .HasForeignKey(d => d.code_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbOrdenCorte_Ensamblado_Acabado_Etiquetado_code_Id_Prod_tbOrdenCompraDetalle_code_Id");

                entity.HasOne(d => d.empl)
                    .WithMany(p => p.tbOrde_Ensa_Acab_Etiq)
                    .HasForeignKey(d => d.empl_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbOrdenCorte_Ensamblado_Acabado_Etiquetado_empl_Id_Gral_tbEmpleados_empl_Id");

                entity.HasOne(d => d.ppro)
                    .WithMany(p => p.tbOrde_Ensa_Acab_Etiq)
                    .HasForeignKey(d => d.ppro_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbOrdenCorte_Ensamblado_Acabado_Etiquetado_ppro_Id_Prod_tbPedidoProduccion_ppro_Id");

                entity.HasOne(d => d.proc)
                    .WithMany(p => p.tbOrde_Ensa_Acab_Etiq)
                    .HasForeignKey(d => d.proc_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbOrdenCorte_Ensamblado_Acabado_Etiquetado_Prod_tbProcesos_proc_Id");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbOrde_Ensa_Acab_Etiqusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbOrdenCorte_Ensamblado_Acabado_Etiquetado_usua_UsuarioCreacion_Acce_tbUsuario_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbOrde_Ensa_Acab_Etiqusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Prod_tbOrdenCorte_Ensamblado_Acabado_Etiquetado_usua_UsuarioModificacion_Acce_tbUsuario_usua_Id");
            });

            modelBuilder.Entity<tbOrdenCompra>(entity =>
            {
                entity.HasKey(e => e.orco_Id)
                    .HasName("PK_Prod_tbOrdenCompra_orco_Id");

                entity.ToTable("tbOrdenCompra", "Prod");

                entity.Property(e => e.orco_DireccionEntrega)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.orco_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.orco_EstadoOrdenCompra)
                    .IsRequired()
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.orco_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.orco_FechaEmision).HasColumnType("datetime");

                entity.Property(e => e.orco_FechaLimite).HasColumnType("datetime");

                entity.Property(e => e.orco_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.orco_IdClienteNavigation)
                    .WithMany(p => p.tbOrdenCompra)
                    .HasForeignKey(d => d.orco_IdCliente)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbOrdenCompra_orco_IdCliente_Prod_tbClientes_clie_Id");

                entity.HasOne(d => d.orco_IdEmbalajeNavigation)
                    .WithMany(p => p.tbOrdenCompra)
                    .HasForeignKey(d => d.orco_IdEmbalaje)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbOrdenCompra_orco_IdEmbalaje_Prod_tbTipoEmbalaje_emba_Id");

                entity.HasOne(d => d.orco_MetodoPagoNavigation)
                    .WithMany(p => p.tbOrdenCompra)
                    .HasForeignKey(d => d.orco_MetodoPago)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbOrdenCompra_orco_MetodoPago_Gral_tbFormasPago_mepa_Id");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbOrdenComprausua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbOrdenCompra_orco_UsuarioCreacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbOrdenComprausua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Prod_tbOrdenCompra_orco_UsuarioModificacion_Acce_tbUsuarios_usua_Id");
            });

            modelBuilder.Entity<tbOrdenCompraDetalles>(entity =>
            {
                entity.HasKey(e => e.code_Id)
                    .HasName("PK_Prod_tbOrdenCompraDetalles_code_Id");

                entity.ToTable("tbOrdenCompraDetalles", "Prod");

                entity.Property(e => e.code_Descuento).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.code_Documento)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.code_EspecificacionEmbalaje)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.code_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.code_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.code_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.code_Impuesto).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.code_Medidas)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.code_Sexo)
                    .IsRequired()
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.code_Unidad).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.code_Valor).HasColumnType("decimal(18, 2)");

                entity.HasOne(d => d.colr)
                    .WithMany(p => p.tbOrdenCompraDetalles)
                    .HasForeignKey(d => d.colr_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbOrdenCompraDetalles_colr_Id_Prod_tbColores_colr_Id");

                entity.HasOne(d => d.esti)
                    .WithMany(p => p.tbOrdenCompraDetalles)
                    .HasForeignKey(d => d.esti_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbOrdenCompraDetalles_esti_Id_Prod_tbEstilos_esti_Id");

                entity.HasOne(d => d.orco)
                    .WithMany(p => p.tbOrdenCompraDetalles)
                    .HasForeignKey(d => d.orco_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbOrdenCompraDetalles_orco_Id_Prod_tbOrdenCompra_orco_Id");

                entity.HasOne(d => d.proc_IdComienzaNavigation)
                    .WithMany(p => p.tbOrdenCompraDetalles)
                    .HasForeignKey(d => d.proc_IdComienza)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbOrdenCompraDetalles_proc_IdComienza_Prod_tbProcesos_proc_Id");

                entity.HasOne(d => d.tall)
                    .WithMany(p => p.tbOrdenCompraDetalles)
                    .HasForeignKey(d => d.tall_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbOrdenCompraDetalles_tall_Id_Prod_tbTalla_tall_Id");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbOrdenCompraDetallesusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbOrdenCompraDetalles_code_UsuarioCreacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbOrdenCompraDetallesusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Prod_tbOrdenCompraDetalles_code_UsuarioModificacion_Acce_tbUsuarios_usua_Id");
            });

            modelBuilder.Entity<tbPaises>(entity =>
            {
                entity.HasKey(e => e.pais_Id)
                    .HasName("PK_Gral_tbPaises_pais_Id");

                entity.ToTable("tbPaises", "Gral");

                entity.HasIndex(e => e.pais_Codigo, "UQ_Gral_tbPaises_pais_Codigo")
                    .IsUnique();

                entity.HasIndex(e => e.pais_Nombre, "UQ_Gral_tbPaises_pais_Nombre")
                    .IsUnique();

                entity.Property(e => e.pais_Codigo)
                    .IsRequired()
                    .HasMaxLength(2)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.pais_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.pais_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.pais_FechaEliminacion).HasColumnType("datetime");

                entity.Property(e => e.pais_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.pais_Nombre)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbPaisesusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Gral_tbPaises_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioEliminacionNavigation)
                    .WithMany(p => p.tbPaisesusua_UsuarioEliminacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioEliminacion)
                    .HasConstraintName("FK_Gral_tbPaises_usua_UsuarioEliminacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbPaisesusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Gral_tbPaises_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id");
            });

            modelBuilder.Entity<tbPantallas>(entity =>
            {
                entity.HasKey(e => e.pant_Id)
                    .HasName("PK_Acce_tbPantallas_pant_Id");

                entity.ToTable("tbPantallas", "Acce");

                entity.Property(e => e.pant_Esquema).HasMaxLength(100);

                entity.Property(e => e.pant_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.pant_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.pant_FechaEliminacion).HasColumnType("datetime");

                entity.Property(e => e.pant_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.pant_Icono).HasMaxLength(50);

                entity.Property(e => e.pant_Nombre).HasMaxLength(100);

                entity.Property(e => e.pant_URL).HasMaxLength(100);

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbPantallasusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Acce_tbPantallas_pant_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbPantallasusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Acce_tbPantallas_pant_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id");
            });

            modelBuilder.Entity<tbPedidosOrden>(entity =>
            {
                entity.HasKey(e => e.peor_Id)
                    .HasName("PK_Prod_tbPedidosOrden_peor_Id");

                entity.ToTable("tbPedidosOrden", "Prod");

                entity.Property(e => e.peor_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.peor_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.peor_FechaEntrada).HasColumnType("datetime");

                entity.Property(e => e.peor_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.peor_No_Duca)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.peor_Obsevaciones).HasMaxLength(400);

                entity.HasOne(d => d.peor_No_DucaNavigation)
                    .WithMany(p => p.tbPedidosOrden)
                    .HasForeignKey(d => d.peor_No_Duca)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbPedidosOrden_tbDuca_peor_No_Duca");

                entity.HasOne(d => d.prov)
                    .WithMany(p => p.tbPedidosOrden)
                    .HasForeignKey(d => d.prov_Id)
                    .HasConstraintName("FK_Prod_tbPedidosOrden_prov_Id_Prod_tbProveedores_prov_Id");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbPedidosOrdenusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbPedidosOrden_tbUsuarios_peor_UsuarioCreacion");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbPedidosOrdenusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Prod_tbPedidosOrden_tbUsuarios_peor_UsuarioModificacion");
            });

            modelBuilder.Entity<tbPedidosOrdenDetalle>(entity =>
            {
                entity.HasKey(e => e.prod_Id)
                    .HasName("PK_Prod_tbPedidosOrdenDetalle_prod_Id");

                entity.ToTable("tbPedidosOrdenDetalle", "Prod");

                entity.Property(e => e.prod_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.prod_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.prod_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.prod_Peso).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.prod_Precio).HasColumnType("decimal(18, 2)");

                entity.HasOne(d => d.mate)
                    .WithMany(p => p.tbPedidosOrdenDetalle)
                    .HasForeignKey(d => d.mate_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbPedidosOrdenDetalle_mate_Id_Pro_tbMateriales");

                entity.HasOne(d => d.pedi)
                    .WithMany(p => p.tbPedidosOrdenDetalle)
                    .HasForeignKey(d => d.pedi_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbPedidosOrdenDetalle_pedi_Id_Pro_tbPedidos");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbPedidosOrdenDetalleusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbPedidosOrdenDetalle_tbUsuarios_prod_UsuarioCreacion");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbPedidosOrdenDetalleusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Prod_tbPedidosOrdenDetalle_tbUsuarios_prod_UsuarioModificacion");
            });

            modelBuilder.Entity<tbPedidosProduccion>(entity =>
            {
                entity.HasKey(e => e.ppro_Id)
                    .HasName("PK_prod_tbPedidosProduccion");

                entity.ToTable("tbPedidosProduccion", "Prod");

                entity.Property(e => e.ppro_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.ppro_Estados)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.Property(e => e.ppro_Fecha).HasColumnType("datetime");

                entity.Property(e => e.ppro_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.ppro_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.ppro_Observaciones).IsRequired();

                entity.HasOne(d => d.empl)
                    .WithMany(p => p.tbPedidosProduccion)
                    .HasForeignKey(d => d.empl_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_prod_tbPedidosProduccion_Prod_tbEmpleadosProduccion_empl_Id");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbPedidosProduccionusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbPedidosProduccion_tbUsuarios_ppro_UsuCrea");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbPedidosProduccionusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Prod_tbPedidosProduccion_tbUsuarios_ppro_UsuModifica");
            });

            modelBuilder.Entity<tbPedidosProduccionDetalles>(entity =>
            {
                entity.HasKey(e => e.ppde_Id)
                    .HasName("PK_Prod_tbPedidosProduccionDetalle");

                entity.ToTable("tbPedidosProduccionDetalles", "Prod");

                entity.Property(e => e.ppde_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.ppde_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.ppde_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.lote)
                    .WithMany(p => p.tbPedidosProduccionDetalles)
                    .HasForeignKey(d => d.lote_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbPedidosProduccionDetalle_lote_Id_Prod_tbLotes");

                entity.HasOne(d => d.ppro)
                    .WithMany(p => p.tbPedidosProduccionDetalles)
                    .HasForeignKey(d => d.ppro_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbPedidosProduccionDetalle_ppro_Id_Prod_tbPedidosProduccion");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbPedidosProduccionDetallesusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbPedidosProduccionDetalle_tbUsuarios_ppde_UsuCrea");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbPedidosProduccionDetallesusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Prod_tbPedidosProduccionDetalle_tbUsuarios_ppde_UsuModifica");
            });

            modelBuilder.Entity<tbPersonaJuridica>(entity =>
            {
                entity.HasKey(e => e.peju_Id)
                    .HasName("PK_Adua_tbPersonaJuridica_peju_Id");

                entity.ToTable("tbPersonaJuridica", "Adua");

                entity.Property(e => e.peju_CorreoElectronico)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.peju_CorreoElectronicoAlternativo)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.peju_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.peju_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.peju_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.peju_NumeroLocalRepresentante)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.peju_PuntoReferencia)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.peju_PuntoReferenciaRepresentante)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.peju_TelefonoEmpresa)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.peju_TelefonoFijoRepresentanteLegal)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.peju_TelefonoRepresentanteLegal)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.HasOne(d => d.colo)
                    .WithMany(p => p.tbPersonaJuridicacolo)
                    .HasForeignKey(d => d.colo_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_PersonaJuridica_colo_Id_Gral_Colonia_colo_Id");

                entity.HasOne(d => d.peju_ColoniaRepresentanteNavigation)
                    .WithMany(p => p.tbPersonaJuridicapeju_ColoniaRepresentanteNavigation)
                    .HasForeignKey(d => d.peju_ColoniaRepresentante)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_PersonaJuridica_peju_ColoniaRepresentante_Gral_ColoniaRepresentante_colo_Id");

                entity.HasOne(d => d.peju_EstadoRepresentanteNavigation)
                    .WithMany(p => p.tbPersonaJuridica)
                    .HasForeignKey(d => d.peju_EstadoRepresentante)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_PersonaJuridica_peju_EstadoRepresentante_Gral_tbProvincias_pvin_Id");

                entity.HasOne(d => d.pers)
                    .WithMany(p => p.tbPersonaJuridica)
                    .HasForeignKey(d => d.pers_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_PersonaJuridica_pers_Id_Adua_Personas_pers_Id");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbPersonaJuridicausua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_PersonaJuridica_peju_UsuarioCreacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbPersonaJuridicausua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Adua_PersonaJuridica_peju_UsuarioModificacion_Acce_tbUsuarios_usua_Id");
            });

            modelBuilder.Entity<tbPersonaNatural>(entity =>
            {
                entity.HasKey(e => e.pena_Id)
                    .HasName("PK_Adua_tbPersonaNatural_pena_Id");

                entity.ToTable("tbPersonaNatural", "Adua");

                entity.Property(e => e.pena_ArchivoDNI).IsRequired();

                entity.Property(e => e.pena_ArchivoNumeroRecibo).IsRequired();

                entity.Property(e => e.pena_ArchivoRTN).IsRequired();

                entity.Property(e => e.pena_CorreoAlternativo).HasMaxLength(50);

                entity.Property(e => e.pena_CorreoElectronico)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.pena_DNI)
                    .IsRequired()
                    .HasMaxLength(40);

                entity.Property(e => e.pena_DireccionExacta)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.pena_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.pena_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.pena_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.pena_NumeroRecibo)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.pena_RTN)
                    .IsRequired()
                    .HasMaxLength(40);

                entity.Property(e => e.pena_TelefonoCelular).HasMaxLength(20);

                entity.Property(e => e.pena_TelefonoFijo).HasMaxLength(20);

                entity.HasOne(d => d.ciud)
                    .WithMany(p => p.tbPersonaNatural)
                    .HasForeignKey(d => d.ciud_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_PersonaNatural_ciud_Id_Gral_Ciudades");

                entity.HasOne(d => d.pers)
                    .WithMany(p => p.tbPersonaNatural)
                    .HasForeignKey(d => d.pers_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_PersonaNatural_pers_Id_Adua_Persona_pers_Id");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbPersonaNaturalusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_PersonaNatural_pena_UsuarioCreacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbPersonaNaturalusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Adua_PersonaNatural_pena_UsuarioModificacion_Acce_tbUsuarios_usua_Id");
            });

            modelBuilder.Entity<tbPersonas>(entity =>
            {
                entity.HasKey(e => e.pers_Id)
                    .HasName("PK_Adua_tbPersonas_pers_Id");

                entity.ToTable("tbPersonas", "Adua");

                entity.HasIndex(e => e.pers_RTN, "UQ_Adua_tbPersonas_pers_RTN")
                    .IsUnique();

                entity.Property(e => e.pers_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.pers_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.pers_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.pers_RTN)
                    .IsRequired()
                    .HasMaxLength(40);

                entity.HasOne(d => d.escv)
                    .WithMany(p => p.tbPersonasescv)
                    .HasForeignKey(d => d.escv_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_Personas_escv_Id_Gral_EstadoCivil_escv_Id");

                entity.HasOne(d => d.ofic)
                    .WithMany(p => p.tbPersonas)
                    .HasForeignKey(d => d.ofic_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_Personas_ofic_Id_Gral_Oficina_ofic_Id");

                entity.HasOne(d => d.ofpr)
                    .WithMany(p => p.tbPersonasofpr)
                    .HasForeignKey(d => d.ofpr_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_Personas_ofpr_Id_Gral_OficioProfesion_ofpr_Id");

                entity.HasOne(d => d.pers_OfprRepresentanteNavigation)
                    .WithMany(p => p.tbPersonaspers_OfprRepresentanteNavigation)
                    .HasForeignKey(d => d.pers_OfprRepresentante)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_Personas_pers_OfprRepresentante_OficioProfesionRepresentante_escv_Id");

                entity.HasOne(d => d.pers_escvRepresentanteNavigation)
                    .WithMany(p => p.tbPersonaspers_escvRepresentanteNavigation)
                    .HasForeignKey(d => d.pers_escvRepresentante)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_Personas_pers_escvRepresentante_EstadoCivilRepresentante_escv_Id");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbPersonasusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_Personas_pers_UsuarioCreacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbPersonasusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Adua_Personas_pers_UsuarioModificacion_Acce_tbUsuarios_usua_Id");
            });

            modelBuilder.Entity<tbProcesos>(entity =>
            {
                entity.HasKey(e => e.proc_Id)
                    .HasName("PK_Prod_tbProcesos_proc_Id");

                entity.ToTable("tbProcesos", "Prod");

                entity.HasIndex(e => e.proc_Descripcion, "UQ_Prod_tbProcesos_proc_Descripcion")
                    .IsUnique();

                entity.Property(e => e.proc_Descripcion)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.proc_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.proc_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.proc_FechaEliminacion).HasColumnType("datetime");

                entity.Property(e => e.proc_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbProcesosusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .HasConstraintName("FK_Prod_tbProcesos_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioEliminacionNavigation)
                    .WithMany(p => p.tbProcesosusua_UsuarioEliminacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioEliminacion)
                    .HasConstraintName("FK_Prod_tbProcesos_usua_UsuarioEliminacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbProcesosusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Prod_tbProcesos_Acce_tbUsuarios_proce_UsuModifica");
            });

            modelBuilder.Entity<tbProveedores>(entity =>
            {
                entity.HasKey(e => e.prov_Id)
                    .HasName("PK_Prod_tbProveedores_prov_Id");

                entity.ToTable("tbProveedores", "Gral");

                entity.HasIndex(e => e.prov_NombreCompania, "UQ_Prod_tbProveedores_prov_NombreCompania")
                    .IsUnique();

                entity.Property(e => e.prov_CodigoPostal)
                    .IsRequired()
                    .HasMaxLength(5)
                    .IsUnicode(false);

                entity.Property(e => e.prov_CorreoElectronico)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.prov_DireccionExacta).HasMaxLength(350);

                entity.Property(e => e.prov_Estado)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.prov_Fax).HasMaxLength(20);

                entity.Property(e => e.prov_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.prov_FechaEliminacion).HasColumnType("datetime");

                entity.Property(e => e.prov_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.prov_NombreCompania)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.prov_NombreContacto)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.prov_Telefono)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.HasOne(d => d.prov_CiudadNavigation)
                    .WithMany(p => p.tbProveedores)
                    .HasForeignKey(d => d.prov_Ciudad)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbProveedores_prov_Ciudad");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbProveedoresusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbProveedores_tbUsuarios_prov_UsuarioCreacion");

                entity.HasOne(d => d.usua_UsuarioEliminacionNavigation)
                    .WithMany(p => p.tbProveedoresusua_UsuarioEliminacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioEliminacion)
                    .HasConstraintName("FK_Prod_tbProveedores_tbUsuarios_prov_usua_UsuarioEliminacion");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbProveedoresusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Prod_tbProveedores_tbUsuarios_prov_usua_UsuarioModificacion");
            });

            modelBuilder.Entity<tbProveedoresDeclaracion>(entity =>
            {
                entity.HasKey(e => e.pvde_Id)
                    .HasName("PK_Adua_tbProveedoresDeclaracion_pvde_Id");

                entity.ToTable("tbProveedoresDeclaracion", "Adua");

                entity.Property(e => e.pvde_Condicion_Otra).HasMaxLength(300);

                entity.Property(e => e.pvde_Estado)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.pvde_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.pvde_FechaEliminacion).HasColumnType("datetime");

                entity.Property(e => e.pvde_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.coco)
                    .WithMany(p => p.tbProveedoresDeclaracion)
                    .HasForeignKey(d => d.coco_Id)
                    .HasConstraintName("FK_Adua_tbProveedoresDeclaracion_tbCondicionesComerciales_coco_Id");

                entity.HasOne(d => d.decl)
                    .WithMany(p => p.tbProveedoresDeclaracion)
                    .HasForeignKey(d => d.decl_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_tbProveedoresDeclaracion_decl_Id_Adua_tbDeclarantes_decl_Id");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbProveedoresDeclaracionusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Acce_tbUsuarios_Adua_tbProveedoresDeclaracion_pvde_UsuarioCreacion");

                entity.HasOne(d => d.usua_UsuarioEliminacionNavigation)
                    .WithMany(p => p.tbProveedoresDeclaracionusua_UsuarioEliminacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioEliminacion)
                    .HasConstraintName("FK_Acce_tbUsuarios_Adua_tbProveedoresDeclaracion_pvde_usua_UsuarioEliminacion");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbProveedoresDeclaracionusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Acce_tbUsuarios_Adua_tbProveedoresDeclaracion_pvde_usua_UsuarioModificacion");
            });

            modelBuilder.Entity<tbProveedoresDeclaracionHistorial>(entity =>
            {
                entity.HasKey(e => e.hpvd_Id)
                    .HasName("PK_Adua_tbProveedoresDeclaracionHistorial_hpvd_Id");

                entity.ToTable("tbProveedoresDeclaracionHistorial", "Adua");

                entity.Property(e => e.hpvd_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.pvde_Condicion_Otra).HasMaxLength(300);

                entity.HasOne(d => d.pvde)
                    .WithMany(p => p.tbProveedoresDeclaracionHistorial)
                    .HasForeignKey(d => d.pvde_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua__tbProveedoresDeclaracionHistorial_tbProveedoresDeclaracion_pvde_Id");
            });

            modelBuilder.Entity<tbProvincias>(entity =>
            {
                entity.HasKey(e => e.pvin_Id)
                    .HasName("PK_Gral_tbProvincias_pvin_Id");

                entity.ToTable("tbProvincias", "Gral");

                entity.HasIndex(e => new { e.pvin_Codigo, e.pvin_Nombre }, "UQ_tbProvincias_pvin_Nombre_pvin_Codigo")
                    .IsUnique();

                entity.Property(e => e.pvin_Codigo)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.pvin_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.pvin_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.pvin_FechaEliminacion).HasColumnType("datetime");

                entity.Property(e => e.pvin_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.pvin_Nombre)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.HasOne(d => d.pais)
                    .WithMany(p => p.tbProvincias)
                    .HasForeignKey(d => d.pais_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Gral_tbPaises_Gral_tbProvincias_pais_Id");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbProvinciasusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Gral_tbProvincias_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioEliminacionNavigation)
                    .WithMany(p => p.tbProvinciasusua_UsuarioEliminacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioEliminacion)
                    .HasConstraintName("FK_Gral_tbProvincias_usua_UsuarioEliminacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbProvinciasusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Gral_tbProvincias_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id");
            });

            modelBuilder.Entity<tbReporteModuloDia>(entity =>
            {
                entity.HasKey(e => e.remo_Id)
                    .HasName("PK_Prod_tbReporteModuloDia_remo_Id");

                entity.ToTable("tbReporteModuloDia", "Prod");

                entity.Property(e => e.remo_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.remo_Fecha).HasColumnType("date");

                entity.Property(e => e.remo_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.remo_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.modu)
                    .WithMany(p => p.tbReporteModuloDia)
                    .HasForeignKey(d => d.modu_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbReporteModuloDia_tbModulos_modu_Id");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbReporteModuloDiausua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbReporteModuloDia_tbUsuarios_remo_UsuCrea");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbReporteModuloDiausua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Prod_tbReporteModuloDia_tbUsuarios_remo_UsuModifica");
            });

            modelBuilder.Entity<tbReporteModuloDiaDetalle>(entity =>
            {
                entity.HasKey(e => e.rdet_Id)
                    .HasName("PK_Prod_tbReporteModuloDiaDetalle_rdet_Id");

                entity.ToTable("tbReporteModuloDiaDetalle", "Prod");

                entity.Property(e => e.rdet_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.rdet_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.rdet_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.code)
                    .WithMany(p => p.tbReporteModuloDiaDetalle)
                    .HasForeignKey(d => d.code_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbReporteModuloDiaDetalle_tbOrdenCompraDetalle_code_Id");

                entity.HasOne(d => d.remo)
                    .WithMany(p => p.tbReporteModuloDiaDetalle)
                    .HasForeignKey(d => d.remo_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbReporteModuloDiaDetalle_tbReporteModuloDia_remo_Id");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbReporteModuloDiaDetalleusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbReporteModuloDiaDetalle_tbUsuarios_rdet_UsuCrea");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbReporteModuloDiaDetalleusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Prod_tbReporteModuloDiaDetalle_tbUsuarios_rdet_UsuModifica");
            });

            modelBuilder.Entity<tbRevisionDeCalidad>(entity =>
            {
                entity.HasKey(e => e.reca_Id)
                    .HasName("PK_Prod_tbRevisiondeCalidad_reca_Id");

                entity.ToTable("tbRevisionDeCalidad", "Prod");

                entity.Property(e => e.reca_Descripcion)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.reca_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.reca_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.reca_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.reca_FechaRevision).HasColumnType("datetime");

                entity.HasOne(d => d.ensa)
                    .WithMany(p => p.tbRevisionDeCalidad)
                    .HasForeignKey(d => d.ensa_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbRevisionDeCalidad_reca_Orden");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbRevisionDeCalidadusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbRevisionDeCalidad_tbUsuarios_reca_UsuarioCreacion");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbRevisionDeCalidadusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Prod_tbRevisionDeCalidad_tbUsuarios_reca_UsuarioModificacion");
            });

            modelBuilder.Entity<tbRoles>(entity =>
            {
                entity.HasKey(e => e.role_Id)
                    .HasName("PK_Acce_tbRoles_role_Id");

                entity.ToTable("tbRoles", "Acce");

                entity.HasIndex(e => e.role_Descripcion, "UQ_acce_tbRoles_role_Descripcion")
                    .IsUnique();

                entity.Property(e => e.role_Descripcion).HasMaxLength(500);

                entity.Property(e => e.role_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.role_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.role_FechaEliminacion).HasColumnType("datetime");

                entity.Property(e => e.role_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbRolesusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Acce_tbUsuarios_usua_UsuarioCreacion_Acce_tbRoles_usua_Id");

                entity.HasOne(d => d.usua_UsuarioEliminacionNavigation)
                    .WithMany(p => p.tbRolesusua_UsuarioEliminacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioEliminacion)
                    .HasConstraintName("FK_Acce_tbUsuarios_usua_UsuarioEliminacion_Acce_tbRoles_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbRolesusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Acce_tbUsuarios_usua_UsuarioModificacion_Acce_tbRoles_usua_Id");
            });

            modelBuilder.Entity<tbRolesXPantallas>(entity =>
            {
                entity.HasKey(e => e.ropa_Id)
                    .HasName("PK_Acce_tbRolesXPantallas_ropa_Id");

                entity.ToTable("tbRolesXPantallas", "Acce");

                entity.HasIndex(e => new { e.role_Id, e.pant_Id }, "UQ_Acce_tbRolesXPantallas_pant_Id_role_Id")
                    .IsUnique();

                entity.Property(e => e.ropa_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.ropa_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.ropa_FechaEliminacion).HasColumnType("datetime");

                entity.Property(e => e.ropa_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.pant)
                    .WithMany(p => p.tbRolesXPantallas)
                    .HasForeignKey(d => d.pant_Id)
                    .HasConstraintName("FK_Acce_tbRolesXPantallas_pant_Id_Acce_tbPantallas_pant_Id");

                entity.HasOne(d => d.role)
                    .WithMany(p => p.tbRolesXPantallas)
                    .HasForeignKey(d => d.role_Id)
                    .HasConstraintName("FK_Acce_tbRolesXPantallas_role_Id_Acce_tbRoles_role_Id");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbRolesXPantallasusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Acce_tbRolesXPantallas_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioEliminacionNavigation)
                    .WithMany(p => p.tbRolesXPantallasusua_UsuarioEliminacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioEliminacion)
                    .HasConstraintName("FK_Acce_tbRolesXPantallas_usua_UsuarioEliminacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbRolesXPantallasusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Acce_tbRolesXPantallas_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id");
            });

            modelBuilder.Entity<tbSubcategoria>(entity =>
            {
                entity.HasKey(e => e.subc_Id)
                    .HasName("PK_Prod_tbSubcategoria_subc_Id");

                entity.ToTable("tbSubcategoria", "Prod");

                entity.Property(e => e.subc_Descripcion).HasMaxLength(200);

                entity.Property(e => e.subc_Estado)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.subc_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.subc_FechaEliminacion).HasColumnType("datetime");

                entity.Property(e => e.subc_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.cate)
                    .WithMany(p => p.tbSubcategoria)
                    .HasForeignKey(d => d.cate_Id)
                    .HasConstraintName("FK_Prod_tbSubcategoria_cate_Id_Prod_tbCategoria_cate_Id");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbSubcategoriausua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbSubCategoria_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioEliminacionNavigation)
                    .WithMany(p => p.tbSubcategoriausua_UsuarioEliminacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioEliminacion)
                    .HasConstraintName("FK_Prod_tbSubCategoria_usua_UsuarioEliminacion_Acce_tbUsuarios_usua_Id");
            });

            modelBuilder.Entity<tbTallas>(entity =>
            {
                entity.HasKey(e => e.tall_Id)
                    .HasName("PK_Prod_tbTalla_tall_Id");

                entity.ToTable("tbTallas", "Prod");

                entity.Property(e => e.tall_Codigo)
                    .HasMaxLength(5)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.tall_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.tall_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.tall_FechaEliminacion).HasColumnType("datetime");

                entity.Property(e => e.tall_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.tall_Nombre)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbTallasusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbOrdenCompra_tall_UsuarioCreacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioEliminacionNavigation)
                    .WithMany(p => p.tbTallasusua_UsuarioEliminacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioEliminacion)
                    .HasConstraintName("FK_Prod_tbOrdenCompra_tall__Acce_tbUsuarios_usua_UsuarioEliminacion_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbTallasusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Prod_tbOrdenCompra_tall_UsuarioModificacion_Acce_tbUsuarios_usua_Id");
            });

            modelBuilder.Entity<tbTipoDocumento>(entity =>
            {
                entity.HasKey(e => e.tido_Id)
                    .HasName("PK_Adua_tbTipoDocumento_tido_Id");

                entity.ToTable("tbTipoDocumento", "Adua");

                entity.HasIndex(e => e.tido_Codigo, "UQ_Adua_tbTipoDocumento_tido_Codigo")
                    .IsUnique();

                entity.HasIndex(e => e.tido_Descripcion, "UQ_Adua_tbTipoDocumento_tido_Descripcion")
                    .IsUnique();

                entity.Property(e => e.tido_Codigo)
                    .IsRequired()
                    .HasMaxLength(4)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.tido_Descripcion).HasMaxLength(50);

                entity.Property(e => e.tido_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.tido_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.tido_FechaEliminacion).HasColumnType("datetime");

                entity.Property(e => e.tido_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbTipoDocumentousua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_tbTipoDocumento_Acce_tbUsuarios_usua_UsuarioCreacion_usua_Id");

                entity.HasOne(d => d.usua_UsuarioEliminacionNavigation)
                    .WithMany(p => p.tbTipoDocumentousua_UsuarioEliminacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioEliminacion)
                    .HasConstraintName("FK_Adua_tbTipoDocumento__Acce_tbUsuarios_usua_UsuarioEliminacion_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbTipoDocumentousua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Adua_tbTipoDocumento_Acce_tbUsuarios_usua_UsuarioModificacion_usua_Id");
            });

            modelBuilder.Entity<tbTipoEmbalaje>(entity =>
            {
                entity.HasKey(e => e.tiem_Id)
                    .HasName("PK_Prod_tbTipoEmbalaje_tiem_Id");

                entity.ToTable("tbTipoEmbalaje", "Prod");

                entity.Property(e => e.tiem_Descripcion)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.tiem_Estado)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.tiem_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.tiem_FechaEliminacion).HasColumnType("datetime");

                entity.Property(e => e.tiem_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbTipoEmbalajeusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbTipoEmbalaje_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioEliminacionNavigation)
                    .WithMany(p => p.tbTipoEmbalajeusua_UsuarioEliminacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioEliminacion)
                    .HasConstraintName("FK_Prod_tbTipoEmbajale_usua_UsuarioEliminacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbTipoEmbalajeusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Prod_tbTipoEmbajale_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id");
            });

            modelBuilder.Entity<tbTipoIntermediario>(entity =>
            {
                entity.HasKey(e => e.tite_Id)
                    .HasName("PK_Adua_tbNivelesComerciales");

                entity.ToTable("tbTipoIntermediario", "Adua");

                entity.HasIndex(e => e.tite_Descripcion, "UQ_Adua_tbTipoIntermediario")
                    .IsUnique();

                entity.Property(e => e.tite_Codigo)
                    .IsRequired()
                    .HasMaxLength(2)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.tite_Descripcion)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.Property(e => e.tite_Estado)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.tite_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.tite_FechaEliminacion).HasColumnType("datetime");

                entity.Property(e => e.tite_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbTipoIntermediariousua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Acce_tbUsuarios_Adua_tbTipoIntermediario_inte_UsuarioCreacion");

                entity.HasOne(d => d.usua_UsuarioEliminacionNavigation)
                    .WithMany(p => p.tbTipoIntermediariousua_UsuarioEliminacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioEliminacion)
                    .HasConstraintName("FK_Acce_tbUsuarios_Adua_tbTipoIntermediario_inte_usua_UsuarioEliminacion");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbTipoIntermediariousua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Acce_tbUsuarios_Adua_tbTipoIntermediario_inte_usua_UsuarioModificacion");
            });

            modelBuilder.Entity<tbTipoLiquidacion>(entity =>
            {
                entity.HasKey(e => e.tipl_Id)
                    .HasName("PK_Adua_tbTipoLiquidacion_tipl_Id");

                entity.ToTable("tbTipoLiquidacion", "Adua");

                entity.HasIndex(e => e.tipl_Descripcion, "UQ_Adua_tbTipoLiquidacion_tipl_Descripcion")
                    .IsUnique();

                entity.Property(e => e.tipl_Descripcion)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.tipl_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.tipl_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.tipl_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbTipoLiquidacionusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_tbTipoLiquidacion_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbTipoLiquidacionusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Adua_tbTipoLiquidacion_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id");
            });

            modelBuilder.Entity<tbTiposIdentificacion>(entity =>
            {
                entity.HasKey(e => e.iden_Id)
                    .HasName("PK_Adua_tbTiposIdentificacion_iden_Id");

                entity.ToTable("tbTiposIdentificacion", "Adua");

                entity.HasIndex(e => e.iden_Descripcion, "UQ_Adua_tbTiposIdentificacion_iden_Descripcion")
                    .IsUnique();

                entity.Property(e => e.iden_Descripcion)
                    .IsRequired()
                    .HasMaxLength(75);

                entity.Property(e => e.iden_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.iden_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.iden_FechaEliminacion).HasColumnType("datetime");

                entity.Property(e => e.iden_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbTiposIdentificacionusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbTiposIdentificacion_tbUsuarios_iden_UsuarioCreacion");

                entity.HasOne(d => d.usua_UsuarioEliminacionNavigation)
                    .WithMany(p => p.tbTiposIdentificacionusua_UsuarioEliminacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioEliminacion)
                    .HasConstraintName("FK_Prod_tbTiposIdentificacion_Acce_tbUsuarios_usua_UsuarioEliminacion_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbTiposIdentificacionusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Prod_tbTiposIdentificacion_tbUsuarios_iden_UsuarioModificacion");
            });

            modelBuilder.Entity<tbTransporte>(entity =>
            {
                entity.HasKey(e => e.tran_Id)
                    .HasName("PK_Adua_tbTransporte_tran_Id");

                entity.ToTable("tbTransporte", "Adua");

                entity.Property(e => e.tran_Chasis)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.tran_Equipamiento).HasMaxLength(200);

                entity.Property(e => e.tran_Estado)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.tran_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.tran_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.tran_IdContenedor)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.tran_Remolque).HasMaxLength(50);

                entity.Property(e => e.tran_TipoCarga)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.trant_FechaEliminacion).HasColumnType("datetime");

                entity.HasOne(d => d.marca)
                    .WithMany(p => p.tbTransporte)
                    .HasForeignKey(d => d.marca_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Adua_tbTransporte_tbMarca_marca_id");

                entity.HasOne(d => d.pais)
                    .WithMany(p => p.tbTransporte)
                    .HasForeignKey(d => d.pais_Id)
                    .HasConstraintName("FK_Gral_tbPaises_pais_Id_Adua_tbTransporte_pais_Id");

                entity.HasOne(d => d.usua_UsuarioCreacioNavigation)
                    .WithMany(p => p.tbTransporteusua_UsuarioCreacioNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacio)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Prod_tbTransporte_tbUsuarios_tran_UsuCrea");

                entity.HasOne(d => d.usua_UsuarioEliminacionNavigation)
                    .WithMany(p => p.tbTransporteusua_UsuarioEliminacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioEliminacion)
                    .HasConstraintName("PK_Adua_tbTransporte_Acce_tbUsuarios_usua_UsuarioEliminacion_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbTransporteusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Prod_tbTransporte_tbUsuarios_tran_UsuModifica");
            });

            modelBuilder.Entity<tbUnidadMedidas>(entity =>
            {
                entity.HasKey(e => e.unme_Id)
                    .HasName("PK_Gral_tbUnidadMedida_unme_Id");

                entity.ToTable("tbUnidadMedidas", "Gral");

                entity.HasIndex(e => e.unme_Descripcion, "UQ_Gral_tbUnidadMedida_unme_Descripcion")
                    .IsUnique();

                entity.Property(e => e.unme_Descripcion)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(e => e.unme_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.unme_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.unme_FechaEliminacion).HasColumnType("datetime");

                entity.Property(e => e.unme_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbUnidadMedidasusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Acce_tbUsuarios_Gral_tbUnidadesMedidas_unme_UsuarioCreacion");

                entity.HasOne(d => d.usua_UsuarioEliminacionNavigation)
                    .WithMany(p => p.tbUnidadMedidasusua_UsuarioEliminacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioEliminacion)
                    .HasConstraintName("FK_Acce_tbUsuarios_Gral_tbUnidadesMedidas_unme_UsuarioEliminacion");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbUnidadMedidasusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Acce_tbUsuarios_Gral_tbUnidadesMedidas_unme_UsuarioModificacion");
            });

            modelBuilder.Entity<tbUsuarios>(entity =>
            {
                entity.HasKey(e => e.usua_Id)
                    .HasName("PK_Acce_tbUsuarios_usua_Id");

                entity.ToTable("tbUsuarios", "Acce");

                entity.HasIndex(e => e.usua_Nombre, "UQ_acce_tbUsuarios_usua_Nombre")
                    .IsUnique();

                entity.Property(e => e.usua_Contrasenia).IsRequired();

                entity.Property(e => e.usua_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.usua_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.usua_FechaEliminacion).HasColumnType("datetime");

                entity.Property(e => e.usua_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.usua_Image).HasMaxLength(500);

                entity.Property(e => e.usua_Nombre)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.Inverseusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Acce_tbUsuarios_usua_UsuarioCreacion");

                entity.HasOne(d => d.usua_UsuarioEliminacionNavigation)
                    .WithMany(p => p.Inverseusua_UsuarioEliminacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioEliminacion)
                    .HasConstraintName("FK_Acce_tbUsuarios_usua_UsuarioEliminacion");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.Inverseusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Acce_tbUsuarios_usua_UsuarioModificacion");
            });

            modelBuilder.Entity<tbUsuariosHistorial>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("tbUsuariosHistorial", "Acce");

                entity.Property(e => e.hist_Accion).HasMaxLength(100);

                entity.Property(e => e.hist_FechaAccion).HasColumnType("datetime");

                entity.Property(e => e.hist_Id).ValueGeneratedOnAdd();

                entity.Property(e => e.usua_Image).HasMaxLength(500);

                entity.Property(e => e.usua_Nombre).HasMaxLength(100);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}