// src/pages/admin/ManageDoctors.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Stethoscope, Edit3, Trash2, Plus, X, Save, Loader2, Upload, Image as ImageIcon } from 'lucide-react';
import { BACKEND_URL } from "../../../utils/config.js";

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingDoc, setEditingDoc] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [form, setForm] = useState({
    name: '',
    specialty: '',
    experience: '',
    rating: '4.5',
    patients: '500+',
    about: '',
    img: null // file object
  });

  // Fetch all doctors
  const fetchDoctors = async () => {
    setLoading(true);
    try {
              const res = await axios.get(`${BACKEND_URL}/api/doctors`);
      
      setDoctors(res.data.data || res.data); // cloudinary wala response
    } catch (err) {
      alert('Failed to load doctors');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, img: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Reset form
  const resetForm = () => {
    setForm({
      name: '', specialty: '', experience: '', rating: '4.5',
      patients: '500+', about: '', img: null
    });
    setImagePreview(null);
    setEditingDoc(null);
  };

  // Open form
  const openForm = (doc = null) => {
    if (doc) {
      setEditingDoc(doc);
      setForm({
        name: doc.name,
        specialty: doc.specialty,
        experience: doc.experience,
        rating: doc.rating || '4.5',
        patients: doc.patients || '500+',
        about: doc.about || '',
        img: null
      });
      setImagePreview(doc.img);
    } else {
      resetForm();
    }
    setShowForm(true);
  };

  // Submit form (Add/Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.img && !editingDoc) {
      alert("Please upload doctor image!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('specialty', form.specialty);
    formData.append('experience', form.experience);
    formData.append('rating', form.rating);
    formData.append('patients', form.patients);
    formData.append('about', form.about);
    if (form.img && form.img instanceof File) {
      formData.append('img', form.img);
    }

    try {
      if (editingDoc) {
        await axios.put(`${BACKEND_URL}/api/doctors/${editingDoc._id}`, formData);
        alert('Doctor updated successfully!');
      } else {
        await axios.post(`${BACKEND_URL}/api/doctors`, formData);
        alert('Doctor added successfully!');
      }
      resetForm();
      setShowForm(false);
      fetchDoctors();
    } catch (err) {
      alert(err.response?.data?.message || 'Operation failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete doctor
  const deleteDoctor = async (id) => {
    if (!window.confirm('Delete this doctor permanently?')) return;

    setDeletingId(id);
    try {
      await axios.delete(`${BACKEND_URL}/api/doctors/${id}`);
      setDoctors(doctors.filter(d => d._id !== id));
      alert('Doctor deleted!');
    } catch (err) {
      alert('Delete failed');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h1 className="h2 fw-bold text-dark d-flex align-items-center gap-3">
            <Stethoscope size={36} className="text-primary" />
            Manage Doctors
          </h1>
          <p className="text-muted">Total: {doctors.length} doctors</p>
        </div>
        <button
          onClick={() => openForm()}
          className="btn btn-primary d-flex align-items-center gap-2 shadow-lg px-4 py-3"
        >
          <Plus size={22} />
          Add New Doctor
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="card shadow-lg border-0 mb-5">
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0">{editingDoc ? 'Edit Doctor' : 'Add New Doctor'}</h5>
            <button onClick={() => setShowForm(false)} className="btn-close btn-close-white"></button>
          </div>
          <div className="card-body p-5">
            <form onSubmit={handleSubmit}>
              <div className="row g-4">
                <div className="col-md-6">
                  <label className="form-label fw-bold">Full Name</label>
                  <input type="text" className="form-control form-control-lg" required
                    value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">Specialty</label>
                  <input type="text" className="form-control form-control-lg" required
                    value={form.specialty} onChange={(e) => setForm({...form, specialty: e.target.value})} />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-bold">Experience</label>
                  <input type="text" className="form-control form-control-lg" required
                    value={form.experience} onChange={(e) => setForm({...form, experience: e.target.value})} />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-bold">Rating</label>
                  <input type="number" step="0.1" min="1" max="5" className="form-control form-control-lg"
                    value={form.rating} onChange={(e) => setForm({...form, rating: e.target.value})} />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-bold">Patients</label>
                  <input type="text" className="form-control form-control-lg"
                    value={form.patients} onChange={(e) => setForm({...form, patients: e.target.value})} />
                </div>

                {/* Image Upload */}
                <div className="col-12">
                  <label className="form-label fw-bold">Doctor Image {editingDoc ? '(Optional)' : '*'}</label>
                  <div className="border-2 border-dashed rounded-3 p-4 text-center" style={{borderColor: '#ddd'}}>
                    {imagePreview ? (
                      <div className="position-relative d-inline-block">
                        <img src={imagePreview} alt="Preview" className="rounded" style={{width: '200px', height: '200px', objectFit: 'cover'}} />
                        <button type="button" onClick={() => {setImagePreview(null); setForm({...form, img: null})}} 
                          className="btn btn-danger btn-sm position-absolute top-0 end-0 rounded-circle">
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <ImageIcon size={48} className="text-muted mb-3" />
                        <p className="text-muted">Click to upload</p>
                      </div>
                    )}
                    <input type="file" accept="image/*" className="d-none" id="imgUpload"
                      onChange={handleImageChange} />
                    <label htmlFor="imgUpload" className="btn btn-outline-primary mt-3">
                      <Upload size={18} className="me-2" />
                      Choose Image
                    </label>
                  </div>
                  {!editingDoc && !imagePreview && <small className="text-danger">Image required for new doctor</small>}
                </div>

                <div className="col-12">
                  <label className="form-label fw-bold">About (Optional)</label>
                  <textarea rows={4} className="form-control"
                    value={form.about} onChange={(e) => setForm({...form, about: e.target.value})} />
                </div>
              </div>

              <div className="mt-5 d-flex gap-3">
                <button type="submit" disabled={loading} className="btn btn-success btn-lg px-5">
                  {loading ? <Loader2 className="animate-spin me-2" /> : <Save size={20} className="me-2" />}
                  {editingDoc ? 'Update' : 'Add'} Doctor
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="btn btn-secondary btn-lg px-5">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Doctors Grid */}
      <div className="row g-4">
        {doctors.length === 0 ? (
          <div className="col-12 text-center py-5">
            <Stethoscope size={80} className="text-muted mb-4 opacity-25" />
            <h4 className="text-muted">No doctors yet</h4>
            <p className="text-muted">Add your first doctor!</p>
          </div>
        ) : (
          doctors.map((doc) => (
            <div key={doc._id} className="col-md-6 col-lg-4 col-xl-3">
              <div className="card h-100 shadow-sm border-0 hover-lift position-relative overflow-hidden">
                <img src={doc.img} alt={doc.name} className="card-img-top" style={{height: '220px', objectFit: 'cover'}} />
                <div className="card-body text-center">
                  <h5 className="fw-bold">{doc.name}</h5>
                  <p className="text-primary">{doc.specialty}</p>
                  <p className="small text-muted">{doc.experience} • {doc.patients} patients</p>
                </div>
                <div className="card-footer bg-light border-0">
                  <div className="d-flex gap-2">
                    <button onClick={() => openForm(doc)} className="btn btn-outline-primary btn-sm flex-fill">
                      <Edit3 size={16} /> Edit
                    </button>
                    <button onClick={() => deleteDoctor(doc._id)} disabled={deletingId === doc._id}
                      className="btn btn-outline-danger btn-sm flex-fill">
                      {deletingId === doc._id ? <Loader2 className="animate-spin" size={16} /> : <Trash2 size={16} />} Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <style >{`
        .hover-lift:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15) !important;
        }
      `}</style>
    </div>
  );
};

export default ManageDoctors;