import React from 'react'

const AnimalForm = ({ animal = {}, onChange, onSubmit, onCancel }) => {
  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {animal._id ? 'Edit Animal' : 'Add New Animal'}
        </h3>
        <form onSubmit={onSubmit} className="mt-5 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={animal.name || ''}
              onChange={onChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="species" className="block text-sm font-medium text-gray-700">
              Species
            </label>
            <input
              type="text"
              name="species"
              id="species"
              defaultValue={animal.species || ''}
              onChange={onChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              type="number"
              name="age"
              id="age"
              defaultValue={animal.age || ''}
              onChange={onChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              name="category"
              id="category"
              defaultValue={animal.category || ''}
              onChange={onChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="">Select category</option>
              <option value="big-cats">Big Cats</option>
              <option value="primates">Primates</option>
              <option value="birds">Birds</option>
              <option value="reptiles">Reptiles</option>
              <option value="marine">Marine</option>
            </select>
          </div>
          <div>
            <label htmlFor="habitat" className="block text-sm font-medium text-gray-700">
              Habitat
            </label>
            <input
              type="text"
              name="habitat"
              id="habitat"
              defaultValue={animal.habitat || ''}
              onChange={onChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="diet" className="block text-sm font-medium text-gray-700">
              Diet
            </label>
            <input
              type="text"
              name="diet"
              id="diet"
              defaultValue={animal.diet || ''}
              onChange={onChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              defaultValue={animal.description || ''}
              onChange={onChange}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="conservation" className="block text-sm font-medium text-gray-700">
              Conservation Status
            </label>
            <select
              name="conservation.status"
              id="conservation"
              defaultValue={animal.conservation?.status || ''}
              onChange={onChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="">Select status</option>
              <option value="Extinct">Extinct</option>
              <option value="Endangered">Endangered</option>
              <option value="Vulnerable">Vulnerable</option>
              <option value="Near Threatened">Near Threatened</option>
              <option value="Least Concern">Least Concern</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {animal._id ? 'Save Changes' : 'Add Animal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AnimalForm